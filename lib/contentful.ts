type ContentfulEntry = {
  sys: {
    id: string;
    type: "Entry";
    contentType?: {
      sys: { id: string };
    };
  };
  fields: Record<string, unknown>;
};

type ContentfulAsset = {
  sys: {
    id: string;
    type: "Asset";
  };
  fields: {
    file?: {
      url?: string;
    };
  };
};

type ContentfulIncludes = {
  Entry?: ContentfulEntry[];
  Asset?: ContentfulAsset[];
};

export type ContentfulLink = {
  sys: {
    type: "Link";
    linkType: "Entry" | "Asset";
    id: string;
  };
};

export type ContentfulResponse<TFields extends Record<string, unknown>> = {
  items: Array<{
    sys: {
      id: string;
      type: "Entry";
    };
    fields: TFields;
  }>;
  includes?: ContentfulIncludes;
};

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN;
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

function getContentfulBaseUrl() {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    throw new Error(
      "Missing Contentful configuration. Set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN."
    );
  }

  return `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;
}

function buildUrl(
  path: string,
  params: Record<string, string | number | boolean>
) {
  const url = new URL(`${getContentfulBaseUrl()}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  url.searchParams.set("access_token", ACCESS_TOKEN ?? "");
  return url.toString();
}

export async function contentfulFetch<TFields extends Record<string, unknown>>(
  path: string,
  params: Record<string, string | number | boolean>
): Promise<ContentfulResponse<TFields>> {
  const url = buildUrl(path, params);
  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Contentful request failed (${response.status})`);
  }

  return response.json() as Promise<ContentfulResponse<TFields>>;
}

export function buildIncludesMap(includes?: ContentfulIncludes) {
  const entriesById = new Map<string, ContentfulEntry>();
  const assetsById = new Map<string, ContentfulAsset>();

  includes?.Entry?.forEach((entry) => entriesById.set(entry.sys.id, entry));
  includes?.Asset?.forEach((asset) => assetsById.set(asset.sys.id, asset));

  return { entriesById, assetsById };
}

export function resolveEntry(
  link: ContentfulLink | undefined,
  entriesById: Map<string, ContentfulEntry>
) {
  if (!link) {
    return undefined;
  }
  return entriesById.get(link.sys.id);
}

export function resolveAssetUrl(
  link: ContentfulLink | undefined,
  assetsById: Map<string, ContentfulAsset>
) {
  if (!link) {
    return undefined;
  }

  const asset = assetsById.get(link.sys.id);
  const url = asset?.fields?.file?.url;
  if (!url) {
    return undefined;
  }

  return url.startsWith("//") ? `https:${url}` : url;
}
// Types for Author and TargetGroup
export type TargetGroupFields = {
  name: string;
  targetingMethod?: string;
};

export type AuthorFields = {
  name: string;
  slug: string;
  slogan?: string;
  promise?: string;
  bio?: any; // RichText
  jobTitle?: string;
  phone?: string;
  email?: string;
  targetGroups?: ContentfulLink[];
  profileImage?: ContentfulLink;
  socialLinks?: Record<string, string>;
  bookingLink?: string;
};

export type PageSettingsFields = {
  pageName: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: ContentfulLink;
  ctaText?: string;
  ctaLink?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export async function getAuthorById(id: string) {
  const response = await contentfulFetch<AuthorFields>(
    `/entries`,
    {
      "sys.id": id,
      include: 2, // Include linked entries (targetGroups) and assets
      content_type: "author", 
    }
  );

  const { entriesById, assetsById } = buildIncludesMap(response.includes);
  const authorEntry = response.items[0];

  if (!authorEntry) {
    return null;
  }

  // Resolve Target Groups
  const resolvedTargetGroups = authorEntry.fields.targetGroups?.map((link) => {
    const entry = resolveEntry(link, entriesById);
    return entry ? (entry.fields as TargetGroupFields) : null;
  }).filter((tg): tg is TargetGroupFields => tg !== null) ?? [];

  // Resolve Profile Image
  const profileImageUrl = resolveAssetUrl(authorEntry.fields.profileImage, assetsById);

  return {
    ...authorEntry.fields,
    targetGroups: resolvedTargetGroups,
    profileImageUrl,
  };
}

export async function getAuthorContactDetails(id: string) {
  const response = await contentfulFetch<Pick<AuthorFields, 'email' | 'phone' | 'socialLinks'>>(
    `/entries`,
    {
      "sys.id": id,
      select: "fields.email,fields.phone,fields.socialLinks",
      content_type: "author",
    }
  );

  const authorEntry = response.items[0];

  if (!authorEntry) {
    return null;
  }

  return authorEntry.fields;
}

export async function getPageSettings(pageName: string) {
  const response = await contentfulFetch<PageSettingsFields>(
    `/entries`,
    {
      content_type: "pageSettings",
      "fields.pageName": pageName,
      include: 1,
    }
  );

  return response.items[0]?.fields;
}
