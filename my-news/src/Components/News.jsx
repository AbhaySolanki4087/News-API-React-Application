// import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./CommonFiles/Footer";

function News() {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // https://newsapi.org/v2/top-headlines?country=us&apiKey=1f8a876785434498ac0366a83a52455c
    const Url = "https://newsapi.org/v2/top-headlines"; 
    const PassKey = "1f8a876785434498ac0366a83a52455c";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${Url}?country=us&apiKey=${PassKey}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2 className="text-center py-20 text-xl text-slate-600">Loading top headlines...</h2>;
  if (error) return <h2 className="text-center py-20 text-xl text-red-600">{error}</h2>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600 font-semibold mb-3">Top Stories</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Explore today’s most important headlines</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 text-base sm:text-lg leading-8">
            Browse the latest news in a clean, modern layout with striking visuals and concise summaries.
          </p>
        </header>
         {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article, index) => (
            <Link 
              key={ index } 
              to={`/articles/${index}`} 
              state={article}
              className="group block overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.25)]"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/800x450?text=No+Image"}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent px-5 py-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-slate-100 font-semibold">
                    {article.source?.name || "Unknown Source"}
                  </span>
                </div>
              </div>

              <div className="px-6 py-6 lg:px-7 lg:py-7">
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                    {article.author ? article.author.split(" ")[0] : "Staff"}
                  </span>
                  <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "No date"}</span>
                </div>

                <h2 className="text-xl font-semibold text-slate-900 mb-4 line-clamp-2">
                  {article.title}
                </h2>

                <p className="text-slate-600 leading-7 mb-6 line-clamp-3">
                  {article.description || "No description available."}
                </p>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-sky-600">Read more</span>
                  <span className="text-slate-400 transition group-hover:text-slate-600">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default News;