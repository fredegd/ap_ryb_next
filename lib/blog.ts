import type { Document } from "@contentful/rich-text-types";
import {
  buildIncludesMap,
  contentfulFetch,
  resolveAssetUrl,
  resolveEntry,
  type ContentfulLink,
} from "./contentful";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  publishDate: string;
  slug: string;
  image: string;
  excerpt: string;
  content: Document;
}

type BlogPostFields = {
  title: string;
  slug: string;
  metaDescription?: string;
  featuredImage: ContentfulLink;
  author: ContentfulLink;
  publishDate: string;
  category?: ContentfulLink[];
  tags?: string[];
  excerpt: string;
  content: Document;
  readingTime?: number;
  status?: string;
};

function formatPublishDate(publishDate: string) {
  if (!publishDate) {
    return "";
  }
  const date = new Date(publishDate);
  if (Number.isNaN(date.getTime())) {
    return publishDate;
  }
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getCategoryLabel(
  categoryLinks: ContentfulLink[] | undefined,
  entriesById: ReturnType<typeof buildIncludesMap>["entriesById"]
) {
  if (!categoryLinks?.length) {
    return "Blog";
  }

  const labels = categoryLinks
    .map((link) => {
      const entry = resolveEntry(link, entriesById);
      const name = entry?.fields?.name;
      return typeof name === "string" ? name : undefined;
    })
    .filter(Boolean);

  return labels.length ? labels.join(", ") : "Blog";
}

function mapBlogPost(
  item: { sys: { id: string }; fields: BlogPostFields },
  includes?: ReturnType<typeof buildIncludesMap>
): BlogPost {
  const { entriesById, assetsById } = includes ?? {
    entriesById: new Map(),
    assetsById: new Map(),
  };

  const imageUrl = resolveAssetUrl(
    item.fields.featuredImage as any,
    assetsById
  );

  return {
    id: item.sys.id,
    title: item.fields.title,
    category: getCategoryLabel(item.fields.category, entriesById),
    date: formatPublishDate(item.fields.publishDate),
    publishDate: item.fields.publishDate,
    slug: item.fields.slug,
    image: imageUrl ?? "/opengraph-image.png",
    excerpt: item.fields.excerpt,
    content: item.fields.content,
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const response = await contentfulFetch<BlogPostFields>("/entries", {
    content_type: "blogPost",
    include: 2,
    order: "-fields.publishDate",
    "fields.status": "Published",
  });

  const includes = buildIncludesMap(response.includes);

  return response.items.map((item) => mapBlogPost(item, includes));
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const response = await contentfulFetch<BlogPostFields>("/entries", {
    content_type: "blogPost",
    include: 2,
    limit: 1,
    "fields.slug": slug,
    "fields.status": "Published",
  });

  const includes = buildIncludesMap(response.includes);
  const item = response.items[0];
  if (!item) {
    return null;
  }

  return mapBlogPost(item, includes);
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const response = await contentfulFetch<Pick<BlogPostFields, "slug">>(
    "/entries",
    {
      content_type: "blogPost",
      select: "fields.slug",
      "fields.status": "Published",
    }
  );

  return response.items.map((item) => item.fields.slug);
}
