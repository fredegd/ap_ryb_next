"use server";

import { getAllBlogPosts } from "./blog";

export async function getBlogPostsClient() {
  return getAllBlogPosts();
}
