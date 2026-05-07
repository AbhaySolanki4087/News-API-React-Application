// import { useEffect, useState } from "react";

// export default function Home() {
//   const [articles, setArticles] = useState([]);

//   const API_KEY = "YOUR_API_KEY";

//   useEffect(() => {
//     fetch(
//       `https://newsapi.org/v2/everything?q=tesla&sortBy=publishedAt&apiKey=${API_KEY}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         setArticles(data.articles);
//       });
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-6">
//       <h1 className="text-3xl font-bold mb-6">Latest News</h1>

//       {/* Grid */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {articles.map((article, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
//           >
//             {/* Image */}
//             <img
//               src={
//                 article.urlToImage ||
//                 "https://via.placeholder.com/400x200"
//               }
//               alt="news"
//               className="w-full h-48 object-cover"
//             />

//             {/* Content */}
//             <div className="p-4">
//               <h2 className="text-lg font-semibold mb-2 line-clamp-2">
//                 {article.title}
//               </h2>

//               <p className="text-sm text-gray-600 line-clamp-3">
//                 {article.description}
//               </p>

//               {/* Footer */}
//               <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
//                 <span>{article.source.name}</span>
//                 <span>
//                   {new Date(article.publishedAt).toLocaleDateString()}
//                 </span>
//               </div>

//               {/* Button */}
//               <a
//                 href={article.url}
//                 target="_blank"
//                 className="inline-block mt-4 text-blue-600 hover:underline"
//               >
//                 Read More →
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }