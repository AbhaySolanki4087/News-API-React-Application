import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/User.css";
import Footer from "./CommonFiles/Footer";

function Users() {

    const [sources, setSources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const Url = "https://newsapi.org/v2/top-headlines/sources"; // https://newsapi.org/v2/top-headlines/sources?apiKey=1f8a876785434498ac0366a83a52455c
    const PassKey = "1f8a876785434498ac0366a83a52455c";

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await fetch(`${Url}?apiKey=${PassKey}`);
        const data = await res.json();
        console.log(data);
        setSources(data.sources); // Assuming the API returns an array of sources in data.sources

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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
            <Link 
              key={source.id} 
              to={`/sources/${source.id}`} 
              state={source}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition block"
            >     
              
              {/* Body */}
            <p className="text-sm text-gray-500 mb-2">
              🌍 {source.country.toUpperCase()} • {source.category}
            </p>

            <p className="text-gray-700 text-sm line-clamp-3">
              {source.description}
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

export default Users;