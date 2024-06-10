import type { Request, Response } from "express";
import { BlogService } from "../services/blog";
import { composeError } from "../utils";

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const newBlogPost = await BlogService.createBlogPost({
      title,
      content,
      authorId,
    });
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
};

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogService.getBlogPosts();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
};

export const getBlogPostById = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const blogPost = await BlogService.getBlogPostById(postId);
    if (!blogPost) {
      res.status(404).json({ error: "Blog post not found" });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const updatedPost = await BlogService.updateBlogPost(postId, {
      title,
      content,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.id);
    await BlogService.deleteBlogPost(postId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: composeError(error) });
  }
};
