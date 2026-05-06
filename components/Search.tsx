
import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section id="search" className="py-16 bg-teal-700 text-white">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-6">Search Destinations</h3>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 px-6 text-lg text-black bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
              placeholder="e.g., Goa, Manali, Taj Mahal..."
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-400 transition-transform transform hover:scale-105">
              Go
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
