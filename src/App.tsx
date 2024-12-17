import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface NpmPackage {
  name: string;
  description: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<NpmPackage[]>([]);
  const [favorites, setFavorites] = useState<
    { name: string; reason: string }[]
  >(JSON.parse(localStorage.getItem("favorites") || "[]"));

  const searchPackages = async () => {
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search?text=${searchTerm}`
      );
      setResults(response.data.objects.map((pkg: any) => pkg.package));
    } catch (error) {
      console.error("Error fetching NPM packages", error);
    }
  };

  const addToFavorites = (pkgName: string) => {
    const reason = prompt("Why is this your favorite?");
    if (reason && !favorites.find((f) => f.name === pkgName)) {
      const updatedFavorites = [...favorites, { name: pkgName, reason }];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      alert("Package already in favorites or invalid input.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Favorite NPM Packages App
      </h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Search for NPM packages"
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={searchPackages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div>
        {results.map((pkg) => (
          <div
            key={pkg.name}
            className="border-b flex justify-between items-center p-2"
          >
            <div>
              <h3 className="font-semibold">{pkg.name}</h3>
              <p className="text-gray-500">{pkg.description}</p>
            </div>
            <button
              onClick={() => addToFavorites(pkg.name)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>

      <Link to="/favorites" className="text-blue-500 mt-4 inline-block">
        View Favorites →
      </Link>
    </div>
  );
};

export default App;
