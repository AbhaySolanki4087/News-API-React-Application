// import React from 'react'
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function NewsDetail() {
    const { state } = useLocation();   // ✅ data comes from Link
    // const { index } = useParams();     // (optional, for debugging)

    const [fullContent, setFullContent] = useState(null);
    const [contentLoading, setContentLoading] = useState(false);
    const [contentError, setContentError] = useState(null);

    useEffect(() => {
        const fetchFullContent = async () => {
            if (!state?.url) return;

            setContentLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/news/extract-content?url=${encodeURIComponent(state.url)}`);
                const data = await response.json();

                if (response.ok) {
                    setFullContent(data);
                } else {
                    setContentError(data.error || "Failed to load full content");
                }
            } catch (error) {
                setContentError("Failed to load full content: " + error.message);
            } finally {
                setContentLoading(false);
            }
        };

        fetchFullContent();
    }, [state?.url]);

    if (!state) return <h2 className="text-center mt-10">Loading...</h2>;

    return (
        <>
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {state.title}
      </h1>

      {/* Author + Date */}
      <div className="text-sm text-gray-500 mb-4 flex gap-4">
        <span>
          👤 {state.author ? state.author : "Unknown Author"}
        </span>

        <span>
          📅 {state.publishedAt
            ? new Date(state.publishedAt).toLocaleDateString()
            : "No Date"}
        </span>
      </div>

      {/* Image */}
      <img
        src={
          fullContent?.image || state.urlToImage ||
          "https://via.placeholder.com/800x400?text=No+Image"
        }
        alt=""
        className="w-full h-80 object-cover rounded mb-6"
      />

      {/* Description */}
      <p className="text-lg text-gray-700 mb-4">
        {state.description || "No description available"}
      </p>

      {/* Content */}
      <div className="text-gray-600 mb-6">
        {contentLoading ? (
          <p>Loading full content...</p>
        ) : fullContent?.content ? (
          <div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: fullContent.content }}
            />
            {fullContent.author && fullContent.author !== state.author && (
              <p className="text-sm text-gray-500 mt-4">Author: {fullContent.author}</p>
            )}
          </div>
        ) : (
          <p>
            {state.content
              ? state.content.replace(/\[\+\d+ chars\]/, "")
              : "No content available"}
          </p>
        )}
        {contentError && (
          <p className="text-red-500 text-sm mt-2">
            Note: {contentError}. Showing available content.
          </p>
        )}
      </div>

      {/* Source */}
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          📰 Source: {state.source?.name || "Unknown"}
        </p>
      </div>

      {/* External Link */}
      <a
        href={state.url}
        target="_blank"
        className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Read Full Article →
      </a>
    </div>
    </>
  );
}

export default NewsDetail
