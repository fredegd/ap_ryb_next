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
  categories: { name: string; color?: string }[];
  gallery: string[];
  testimonials: any[]; // refine type if possible later
  faqs: any[]; // refine type if possible later
  relatedServices: any[]; // refine type if possible later
  bookingLink?: string;
  isFeatured: boolean;
}

export type ServiceFields = {
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
  isFeatured?: boolean;
};

export function mapService(
  item: { sys: { id: string }; fields: ServiceFields },
  includes?: ReturnType<typeof buildIncludesMap>
): Service {
  const { assetsById, entriesById } = includes ?? {
    entriesById: new Map(),
    assetsById: new Map(),
  };

  const imageUrl = resolveAssetUrl(item.fields.heroImage, assetsById);
  const metaDescription = item.fields.metaDescription ?? "";
  
  const rawCategories = item.fields.serviceCategory
      ?.map((link) => resolveEntry(link, entriesById))
      .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
      .map((entry) => ({
          name: entry.fields.name as string,
          color: entry.fields.color as string | undefined
      }))
      .filter((cat) => Boolean(cat.name)) ?? [];


  const categoryNames = rawCategories.map(c => c.name);

  // Backward compatibility: use the first category's color if available
  const categoryColor = rawCategories[0]?.color;

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
    categoryColor: categoryColor,
    categories: rawCategories,
    gallery: galleryUrls,
    testimonials: mapLinkedEntries(item.fields.testimonials),
    faqs: mapLinkedEntries(item.fields.faqs),
    relatedServices: mapLinkedEntries(item.fields.relatedServices),
    bookingLink: item.fields.bookingLink,
    isFeatured: item.fields.isFeatured || false,
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

export async function getFeaturedServices(): Promise<Service[]> {
  const response = await contentfulFetch<ServiceFields>("/entries", {
    content_type: "service",
    include: 2,
    order: "-sys.createdAt",
    "fields.status": "Active",
    "fields.isFeatured": true,
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
