import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FavoritePackage {
  name: string;
  reason: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoritePackage[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const removeFavorite = (name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      const updatedFavorites = favorites.filter((f) => f.name !== name);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Your Favorite NPM Packages
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">No favorites added yet.</p>
      ) : (
        favorites.map((pkg) => (
          <div
            key={pkg.name}
            className="border-b flex justify-between items-center p-2"
          >
            <div>
              <h3 className="font-semibold">{pkg.name}</h3>
              <p className="text-gray-500">{pkg.reason}</p>
            </div>
            <button
              onClick={() => removeFavorite(pkg.name)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}

      <Link to="/" className="text-blue-500 mt-4 inline-block">
        ← Back to Search
      </Link>
    </div>
  );
};

export default Favorites;
