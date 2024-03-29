import { useState } from "react";
import { BarLoader } from "react-spinners";

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`/api/search?q=${searchTerm}`);
    const result = await response.json();
    setSearchResult(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="h-full flex justify-center my-10" >
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100"
              placeholder="Search"
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
          <div className="flex items-center justify-center">
            {loading ? (
              <BarLoader color="#4299e1" />
            ) : (
              searchResult && (
                <div>
                  <h2 className="mb-4 text-xl font-bold text-white">
                    {searchResult.search_information.query}
                  </h2>
                  <ul>
                    {searchResult.organic_results.map((result) => (
                      <li key={result.position} className="mb-2">
                        <a
                          href={result.link}
                          className="text-blue-400 hover:underline"
                        >
                          {result.title}
                        </a>
                        <p className="text-gray-400">{result.snippet}</p>
                        <div className="flex items-center mt-2">
                          <img
                            src={result.thumbnail}
                            alt={result.title}
                            className="w-16 h-16 mr-4 object-contain rounded-lg"
                          />
                          <div>
                            <p className="text-gray-400 font-medium">{result.source}</p>
                            <p className="text-gray-400 text-sm">{result.date}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
