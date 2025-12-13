import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

export interface Service {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  excerpt: string;
  content: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDirectory = path.join(__dirname, "..", "content", "servizi");

export function getAllServices(): Service[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const services = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        image: data.image,
        description: data.description,
        excerpt: data.excerpt,
        content,
      } as Service;
    });

  // Sort by id
  return services.sort((a, b) => a.id - b.id);
}

export function getServiceBySlug(slug: string): Service | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      description: data.description,
      excerpt: data.excerpt,
      content,
    } as Service;
  } catch (error) {
    return null;
  }
}

export function getServiceSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(".md", ""));
}
