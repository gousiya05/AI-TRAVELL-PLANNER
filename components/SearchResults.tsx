
import React from 'react';
import { INDIA_DESTINATIONS } from '../constants';
import { Destination } from '../types';
import DestinationCard from './DestinationCard';
import SearchNotFound from './SearchNotFound';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
  onSelectDestination: (destination: Destination) => void;
  onSuggestionClick: (destinationName: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onBack, onSelectDestination, onSuggestionClick }) => {
  const lowerCaseQuery = query.toLowerCase();
  const results = INDIA_DESTINATIONS.filter(
    dest => dest.name.toLowerCase().includes(lowerCaseQuery) || 
            dest.state.toLowerCase().includes(lowerCaseQuery)
  );

  return (
    <section className="py-20 pt-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        {results.length > 0 ? (
          <>
            <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Home
            </button>
            <h2 className="text-center text-4xl font-bold mb-2">
              Search Results for <span className="text-teal-600">"{query}"</span>
            </h2>
            <p className="text-center text-gray-600 mb-12">{results.length} destination(s) found.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((dest) => (
                <DestinationCard key={dest.name} destination={dest} onSelect={onSelectDestination} />
              ))}
            </div>
          </>
        ) : (
          <SearchNotFound query={query} onSuggestionClick={onSuggestionClick} onBack={onBack} />
        )}
      </div>
    </section>
  );
};

export default SearchResults;
