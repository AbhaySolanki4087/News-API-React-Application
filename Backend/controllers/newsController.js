import { extract } from "article-parser";

export const extractArticleContent = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "URL parameter is required" });
    }

    // Extract article content
    const article = await extract(url);

    if (!article) {
      return res.status(404).json({ error: "Could not extract article content" });
    }

    res.json({
      title: article.title,
      content: article.content,
      description: article.description,
      image: article.image,
      author: article.author,
      published: article.published,
      source: article.source
    });
  } catch (error) {
    console.error("Error extracting article:", error);
    res.status(500).json({ error: "Failed to extract article content" });
  }
};