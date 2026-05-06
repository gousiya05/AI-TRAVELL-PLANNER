
import React from 'react';
import { INDIA_DESTINATIONS } from '../constants';
import { Destination } from '../types';
import DestinationCard from './DestinationCard';

interface DestinationsGridProps {
  onSelectDestination: (destination: Destination) => void;
  onBack: () => void;
}

const DestinationsGrid: React.FC<DestinationsGridProps> = ({ onSelectDestination, onBack }) => {
  return (
    <section className="py-20 pt-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <h2 className="text-center text-4xl font-bold mb-12">
          <span className="text-teal-600">Explore</span> Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDIA_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.name} destination={dest} onSelect={onSelectDestination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;
