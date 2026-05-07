// import React from 'react'
import { useLocation } from "react-router-dom";

function UserByID() {
    const { state } = useLocation();

    if (!state) return <h2 className="text-center mt-10">Loading...</h2>;

    return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6">

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          {state.name}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="bg-gray-100 px-3 py-1 rounded text-sm">
            🌍 {state.country.toUpperCase()}
          </span>

          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
            {state.category}
          </span>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded text-sm">
            {state.language.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {state.description}
        </p>

        {/* Button */}
        <a
          href={state.url}
          target="_blank"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Visit Website →
        </a>
      </div>
    </div>
  );
}

export default UserByID
