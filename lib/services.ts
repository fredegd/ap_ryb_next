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
  icon?: string;
  description: string;
  excerpt: string;
  content: Document;
  howDoesItWork?: Document;
  whoIsItFor?: Document;
  benefits?: Document;
  treatmentProcess?: Document;
  contraindications?: Document;
  duration?: string;
  price?: number;
  priceDescription?: string;
  metaDescription?: string;
  serviceCategories: string[];
  categoryColor?: string;
  gallery: string[];
  testimonials: any[]; // refine type if possible later
  faqs: any[]; // refine type if possible later
  relatedServices: any[]; // refine type if possible later
  bookingLink?: string;
}

type ServiceFields = {
  serviceName: string;
  slug: string;
  metaDescription?: string;
  heroImage: ContentfulLink;
  icon?: string;
  detailedDescription: Document;
  howDoesItWork?: Document;
  whoIsItFor?: Document;
  benefits?: Document;
  treatmentProcess?: Document;
  contraindications?: Document;
  duration?: string;
  price?: number;
  priceDescription?: string;
  gallery?: ContentfulLink[];
  testimonials?: ContentfulLink[];
  faqs?: ContentfulLink[];
  relatedServices?: ContentfulLink[];
  bookingLink?: string;
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

  const getCategoryColor = (
    categoryLinks: ContentfulLink[] | undefined
  ) => {
    if (!categoryLinks?.length) return undefined;
    for (const link of categoryLinks) {
      const entry = resolveEntry(link, entriesById);
      const color = entry?.fields?.color;
      if (typeof color === 'string') return color;
    }
    return undefined;
  };

  const galleryUrls =
  item.fields.gallery
    ?.map((link) => resolveAssetUrl(link, assetsById))
    .filter((url): url is string => Boolean(url)) ?? [];

  // Helper to map linked entries (simplistic version, can be expanded for specific types)
  const mapLinkedEntries = (links: ContentfulLink[] | undefined) => {
    return links
        ?.map((link) => resolveEntry(link, entriesById))
        .filter((entry): entry is any => Boolean(entry))
        .map(entry => entry.fields) ?? []; // Returning fields for now, might need fuller objects
  };

  return {
    id: item.sys.id,
    title: item.fields.serviceName,
    slug: item.fields.slug,
    image: imageUrl ?? "/opengraph-image.png",
    icon: item.fields.icon,
    description: metaDescription,
    excerpt: metaDescription,
    content: item.fields.detailedDescription,
    howDoesItWork: item.fields.howDoesItWork,
    whoIsItFor: item.fields.whoIsItFor,
    benefits: item.fields.benefits,
    treatmentProcess: item.fields.treatmentProcess,
    contraindications: item.fields.contraindications,
    duration: item.fields.duration,
    price: item.fields.price,
    priceDescription: item.fields.priceDescription,
    metaDescription: item.fields.metaDescription,
    serviceCategories: categoryNames,
    categoryColor: getCategoryColor(item.fields.serviceCategory),
    gallery: galleryUrls,
    testimonials: mapLinkedEntries(item.fields.testimonials),
    faqs: mapLinkedEntries(item.fields.faqs),
    relatedServices: mapLinkedEntries(item.fields.relatedServices),
    bookingLink: item.fields.bookingLink,
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
