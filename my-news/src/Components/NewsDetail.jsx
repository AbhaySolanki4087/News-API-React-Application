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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-gray-900">
        {state.title}
      </h1>

      {/* Author + Date */}
      <div className="text-base text-gray-600 mb-8 pb-6 border-b border-gray-300 flex flex-col sm:flex-row sm:gap-6">
        <span className="mb-3 sm:mb-0">
          By <span className="font-semibold text-gray-800">{state.author ? state.author : "Unknown Author"}</span>
        </span>

        <span>
          {state.publishedAt
            ? new Date(state.publishedAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
            : "No Date"}
        </span>
      </div>

      {/* Description */}
      <p className="text-xl text-gray-700 mb-8 leading-relaxed font-light">
        {state.description || "No description available"}
      </p>

      {/* Image - Always show */}
      <img
        src={
          fullContent?.image || state.urlToImage ||
          "https://via.placeholder.com/800x400?text=No+Image"
        }
        alt=""
        className="w-full h-auto max-h-96 object-cover rounded-lg mb-4 shadow-lg"
      />

      {/* Caption */}
      <p className="text-sm text-gray-600 italic mb-8 pb-6 border-b border-gray-300">
        {fullContent?.caption || "Image from article"}
      </p>

      {/* Content */}
      <div className="mb-8 px-4 sm:px-6 lg:px-8 py-6">
        {contentLoading ? (
          <p className="text-center py-8 text-gray-500">Loading full content...</p>
        ) : fullContent?.content ? (
          <div>
            <article 
              className="prose prose-2xl max-w-none 
              prose-headings:font-bold prose-headings:text-gray-900 
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 
              prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-10
              prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-8
              prose-h4:text-xl prose-h4:mb-5 prose-h4:mt-6
              prose-p:text-lg prose-p:leading-8 prose-p:mb-8 prose-p:text-gray-700
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-em:text-gray-800 prose-em:italic
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-4 prose-blockquote:my-8 prose-blockquote:rounded
              prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 prose-a:font-medium
              prose-img:rounded-lg prose-img:my-8 prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto prose-img:object-cover
              prose-li:text-lg prose-li:mb-3 prose-li:text-gray-700
              prose-ul:my-8 prose-ul:ml-6 prose-ul:space-y-3
              prose-ol:my-8 prose-ol:ml-6 prose-ol:space-y-3
              prose-code:bg-gray-200 prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-red-700 prose-code:font-mono prose-code:text-base
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:font-mono prose-pre:text-sm
              prose-hr:my-12 prose-hr:border-gray-300
              prose-table:my-8 prose-table:w-full prose-tbody:text-gray-700 prose-tbody:bg-white
              prose-td:py-3 prose-td:px-4 prose-th:py-3 prose-th:px-4 prose-th:bg-gray-100 prose-th:font-bold"
              style={{
                '--tw-prose-img-shadow': 'var(--tw-shadow-lg)',
              }}
              dangerouslySetInnerHTML={{ 
                __html: fullContent.content
                  .replace(/<img/g, '<img style="width: 100%; height: auto; border-radius: 8px; margin: 2rem 0; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);"') 
                  .replace(/<p>/g, '<p style="margin-bottom: 1.5rem; line-height: 1.8; font-size: 1.125rem;">')
                  .replace(/<\/p>\n<p>/g, '</p><div style="height: 0.5rem;"></div><p>')
              }}
            />
            {fullContent.author && fullContent.author !== state.author && (
              <p className="text-base text-gray-600 mt-12 pt-6 border-t-2 border-gray-300 italic">By {fullContent.author}</p>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
            <p className="text-lg leading-8 text-gray-700">
              {state.content
                ? state.content.replace(/\[\+\d+ chars\]/, "")
                : "No content available"}
            </p>
          </div>
        )}
        {contentError && (
          <p className="text-red-500 text-sm mt-2">
            Note: {contentError}. Showing available content.
          </p>
        )}
      </div>

      {/* Source */}
      <div className="mb-8 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Source: <span className="font-semibold text-gray-800">{state.source?.name || "Unknown"}</span>
        </p>
      </div>

      {/* External Link */}
      <a
        href={state.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
      >
        Read Full Article on Source →
      </a>
    </div>
    </>
  );
}

export default NewsDetail
