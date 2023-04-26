import { useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    
    axios.post('/api/search', {
      searchQuery: searchQuery
    }).then((response) => {
      setSearchResults(response.data);
    }).catch((error) => {
      console.log(error);
    });
  };

    

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-purple-900 to-blue-900">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-green-400 tracking-wide">SEARCH PATIENT RECORDS</h1>
        <form onSubmit={handleSearch} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Search by name, date, or ID"
            className="w-full max-w-md py-2 px-4 rounded-full shadow-lg border border-gray-600 bg-gray-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <button type="submit" className="mt-4 py-2 px-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-gray-100 shadow-lg">
            SEARCH
          </button>
        </form>
      </div>
      {searchResults.length > 0 && (
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-green-400 tracking-wide">SEARCH RESULTS</h2>
          <table className="table-auto bg-gray-800 text-gray-100 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((SSR) => (
                <tr key={searchResults.PatientID}>
                  <td className="border px-4 py-2">{SSR.FirstName}</td>
                  <td className="border px-4 py-2">{SSR.LastName}</td>
                  <td className="border px-4 py-2">{SSR.Gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
