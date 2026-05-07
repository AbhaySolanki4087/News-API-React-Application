import express from "express";
import { extractArticleContent } from "../controllers/newsController.js";

const router = express.Router();

// Route to extract full article content from URL
router.get("/extract-content", extractArticleContent);

export default router;