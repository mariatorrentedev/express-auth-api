import { PrismaClient } from "@prisma/client";
import { BlogPost } from "../types/blog";

const prisma = new PrismaClient();

export const BlogService = {
  async createBlogPost(blogPostData: Omit<BlogPost, "id">): Promise<BlogPost> {
    const newBlogPost = await prisma.blogPost.create({ data: blogPostData });
    return newBlogPost;
  },

  async getBlogPosts(): Promise<BlogPost[]> {
    const blogPosts = await prisma.blogPost.findMany();
    return blogPosts;
  },

  async getBlogPostById(id: number): Promise<BlogPost | null> {
    const blogPost = await prisma.blogPost.findUnique({ where: { id } });
    return blogPost;
  },

  async updateBlogPost(
    id: number,
    updatedData: Partial<BlogPost>
  ): Promise<BlogPost> {
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: updatedData,
    });
    return updatedPost;
  },

  async deleteBlogPost(id: number): Promise<void> {
    await prisma.blogPost.delete({ where: { id } });
  },
};
