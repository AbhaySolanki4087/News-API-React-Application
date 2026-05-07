// import { useEffect, useState } from "react";

// function News() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("https://newsapi.org/v2/everything?q=tesla&from=2026-03-24&sortBy=publishedAt&apiKey=1f8a876785434498ac0366a83a52455c")
//       .then((res) => res.json())
//       .then((result) => setData(result))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div>
//       <h1>News Page (API Data)</h1>

//       {data.map((item) => (
//         <div key={item.id} style={{ marginBottom: "10px" }}> 
//           <h3>{item.title}</h3>
//           <p>{item.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default News;