import type { Document } from "@contentful/rich-text-types";
import {
  buildIncludesMap,
  contentfulFetch,
  resolveAssetUrl,
  resolveEntry,
  type ContentfulLink,
} from "./contentful";

export interface Service {
  id: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  excerpt: string;
  content: Document;
  metaDescription?: string;
  serviceCategories: string[];
}

type ServiceFields = {
  serviceName: string;
  slug: string;
  metaDescription?: string;
  heroImage: ContentfulLink;
  detailedDescription: Document;
  order?: number;
  status?: string;
  serviceCategory?: ContentfulLink[];
};

function mapService(
  item: { sys: { id: string }; fields: ServiceFields },
  includes?: ReturnType<typeof buildIncludesMap>
): Service {
  const { assetsById, entriesById } = includes ?? {
    entriesById: new Map(),
    assetsById: new Map(),
  };

  const imageUrl = resolveAssetUrl(item.fields.heroImage, assetsById);
  const metaDescription = item.fields.metaDescription ?? "";
  const categoryNames =
    item.fields.serviceCategory
      ?.map((link) => resolveEntry(link, entriesById))
      .map((entry) => entry?.fields?.name as string | undefined)
      .filter((name): name is string => Boolean(name)) ?? [];

  return {
    id: item.sys.id,
    title: item.fields.serviceName,
    slug: item.fields.slug,
    image: imageUrl ?? "/opengraph-image.png",
    description: metaDescription,
    excerpt: metaDescription,
    content: item.fields.detailedDescription,
    metaDescription: item.fields.metaDescription,
    serviceCategories: categoryNames,
  };
}

export async function getAllServices(): Promise<Service[]> {
  const response = await contentfulFetch<ServiceFields>("/entries", {
    content_type: "service",
    include: 2,
    order: "fields.order",
    "fields.status": "Active",
  });

  const includes = buildIncludesMap(response.includes);
  return response.items.map((item) => mapService(item, includes));
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const response = await contentfulFetch<ServiceFields>("/entries", {
    content_type: "service",
    include: 2,
    limit: 1,
    "fields.slug": slug,
    "fields.status": "Active",
  });

  const includes = buildIncludesMap(response.includes);
  const item = response.items[0];
  if (!item) {
    return null;
  }

  return mapService(item, includes);
}

export async function getServiceSlugs(): Promise<string[]> {
  const response = await contentfulFetch<Pick<ServiceFields, "slug">>(
    "/entries",
    {
      content_type: "service",
      select: "fields.slug",
      "fields.status": "Active",
    }
  );

  return response.items.map((item) => item.fields.slug);
}
