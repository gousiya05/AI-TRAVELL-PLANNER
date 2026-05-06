import React from 'react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onSelect }) => {
  const hoverBg = destination.theme.primary.replace('bg-', 'hover:bg-');
  
  return (
    <button
      className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-all duration-300 group focus:outline-none focus:ring-4 ${destination.theme.primary.replace('bg-', 'focus:ring-').replace('-500', '-300')} text-left w-full`}
      onClick={() => onSelect(destination)}
    >
      <div className="relative h-64">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 ${hoverBg} opacity-0 group-hover:opacity-40`}></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">{destination.name}</h3>
          <p className="text-sm text-white/90 drop-shadow-md">{destination.state}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 group-hover:text-gray-800 transition-colors">{destination.shortDescription}</p>
      </div>
    </button>
  );
};

export default DestinationCard;
