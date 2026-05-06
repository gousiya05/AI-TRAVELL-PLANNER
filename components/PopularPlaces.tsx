
import React from 'react';
import { INDIA_DESTINATIONS } from '../constants';
import { Destination } from '../types';
import DestinationCard from './DestinationCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface PopularPlacesProps {
  onSelectDestination: (destination: Destination) => void;
}

const PopularPlaces: React.FC<PopularPlacesProps> = ({ onSelectDestination }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="popular"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto px-6">
        <h4 className="text-center text-4xl font-bold mb-12">
          <span className="text-teal-600">Popular</span> Places
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDIA_DESTINATIONS.slice(0, 6).map((dest) => (
            <DestinationCard key={dest.name} destination={dest} onSelect={onSelectDestination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPlaces;
