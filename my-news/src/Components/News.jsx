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
        console.log(data);
        setArticles(data.articles);

      } catch (err) {
            setError("Error fetching data",err);
      } finally {
            setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-3xl font-bold mb-6">News Sources</h1>
         {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {articles.map((article,index) => (
            <Link 
              key={ index } 
              to={`/articles/${index}`} 
              state={article}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition block"
            >     
              
              {/* Body */}
              {/* Image */}
            <img
                src={
                article.urlToImage ||
                "https://via.placeholder.com/400x200?text=No+Image"
                }
                alt="news"
                className="w-full h-48 object-cover"
            />
            <p className="text-sm text-gray-500 mb-2">
              🌍 {article.author ? article.author.toUpperCase() : "UNKNOWN"} • {article.title}
            </p>

            <p className="text-gray-700 text-sm line-clamp-3">
              {article.description ? article.description : "No description available."}
            </p>
            <p className="text-gray-700 text-sm line-clamp-3">
              {article.content ? article.content.slice(0, 100) + "..." : "No content available."}
            </p>

            {/* Footer */}
            <p className="mt-3 text-blue-500 text-sm hover:underline">
              View Details →
            </p>
          </Link>
          
        ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default News;