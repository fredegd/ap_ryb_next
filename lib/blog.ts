import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  slug: string;
  image: string;
  excerpt: string;
  content: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDirectory = path.join(__dirname, "..", "content", "blog");

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const filePath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: data.id,
        title: data.title,
        category: data.category,
        date: data.date,
        slug: data.slug,
        image: data.image,
        excerpt: data.excerpt,
        content,
      } as BlogPost;
    });

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      date: data.date,
      slug: data.slug,
      image: data.image,
      excerpt: data.excerpt,
      content,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export function getBlogPostSlugs(): string[] {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(".md", ""));
}
