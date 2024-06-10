import express from "express";
import * as blogController from "../controllers/blog";
import { authenticateToken } from "../middleware/authToken";

const router = express.Router();

// Private routes
router.post("/", authenticateToken, blogController.createBlogPost);
router.put("/:id", authenticateToken, blogController.updateBlogPost);
router.delete("/:id", authenticateToken, blogController.deleteBlogPost);

// Public routes
router.get("/", blogController.getBlogPosts);
router.get("/:id", blogController.getBlogPostById);

export default router;
