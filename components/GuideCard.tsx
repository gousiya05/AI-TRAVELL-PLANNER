import React from 'react';
import { Guide } from '../types';
import { TOUR_TYPE_STYLES } from '../constants';

interface GuideCardProps {
  guide: Guide;
  onSelect: (guide: Guide) => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
      {halfStar && <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
      {[...Array(emptyStars)].map((_, i) => <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
    </div>
  );
};

const GuideCard: React.FC<GuideCardProps> = ({ guide, onSelect }) => {
  const { icon, color } = TOUR_TYPE_STYLES[guide.tourType];
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={guide.image} alt={guide.name} />
        <div className={`absolute top-2 right-2 flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${color}`}>
            {icon}
            <span>{guide.tourType}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-800">{guide.name}</h3>
            <div className="flex items-center gap-1">
                <StarRating rating={guide.rating} />
                <span className="text-sm font-bold text-gray-600 ml-1">{guide.rating.toFixed(1)}</span>
            </div>
        </div>
        <p className="text-sm text-gray-500">{guide.location}</p>
        
        <div className="my-4 border-t pt-4 space-y-2">
            <p className="text-sm text-gray-600"><strong className="font-medium">Experience:</strong> {guide.experience}+ years</p>
            <div className="flex flex-wrap gap-2">
                <strong className="font-medium text-sm text-gray-600 self-center">Languages:</strong>
                {guide.languages.map(lang => (
                    <span key={lang} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{lang}</span>
                ))}
            </div>
        </div>

        <div className="mt-auto">
            <button onClick={() => onSelect(guide)} className="w-full bg-teal-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105">
                Select Guide
            </button>
        </div>
      </div>
    </div>
  );
};

export default GuideCard;
