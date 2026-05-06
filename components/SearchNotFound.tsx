
import React from 'react';
import { INDIA_DESTINATIONS } from '../constants';

interface SearchNotFoundProps {
  query: string;
  onSuggestionClick: (destinationName: string) => void;
  onBack: () => void;
}

const SearchNotFound: React.FC<SearchNotFoundProps> = ({ query, onSuggestionClick, onBack }) => {
  const suggestions = INDIA_DESTINATIONS.slice(0, 4);

  return (
    <section className="py-20 pt-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6 text-center">
        <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition mb-8 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold text-red-500 mb-4">Destination Not Found</h2>
          <p className="text-lg text-gray-600 mb-8">
            We couldn't find anything for <span className="font-semibold">"{query}"</span>.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Maybe try one of these popular destinations in India?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {suggestions.map(dest => (
              <button
                key={dest.name}
                onClick={() => onSuggestionClick(dest.name)}
                className="px-6 py-2 bg-teal-100 text-teal-800 font-semibold rounded-full hover:bg-teal-200 transition-colors"
              >
                {dest.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchNotFound;
