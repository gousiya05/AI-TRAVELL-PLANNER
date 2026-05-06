
import React from 'react';
import { Hotel, HotelAmenity } from '../types';

const amenityIcons: Record<HotelAmenity, React.JSX.Element> = {
    'Pool': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 6.168A1 1 0 008 7.236v5.528a1 1 0 001.555.832l3.333-2.764a1 1 0 000-1.664L9.555 6.168z" clipRule="evenodd" /></svg>,
    'WiFi': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2.586l3 3a1 1 0 001.414-1.414L10 13.414l3.293 3.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
    'Parking': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>,
    'Restaurant': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" /></svg>,
    'Gym': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4zm2 2v2a1 1 0 002 0V6h2v2a1 1 0 102 0V6h1a1 1 0 011 1v2a1 1 0 102 0V7a3 3 0 00-3-3H7z" /></svg>,
    'Pet Friendly': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>,
    'Spa': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-2.121a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const HotelCard: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col group">
            <div className="relative h-56">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={hotel.image} alt={hotel.name} />
                 <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm flex items-center gap-1">
                    <StarRating rating={hotel.rating} />
                    <span className="ml-1">{hotel.rating.toFixed(1)}</span>
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 truncate">{hotel.name}</h3>
                    <p className="text-sm text-gray-500">{hotel.location}</p>
                    <div className="mt-3 flex items-center gap-3 text-gray-600">
                        {hotel.amenities.slice(0, 4).map(amenity => (
                            <div key={amenity} title={amenity} className="flex items-center gap-1">
                                {amenityIcons[amenity]}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-500">Starts from</span>
                            <p className="text-xl font-bold text-teal-600">₹{hotel.pricePerNight.toLocaleString()}<span className="text-sm font-normal text-gray-600">/night</span></p>
                        </div>
                        <button onClick={() => alert(`Booking for ${hotel.name} is a demo feature.`)} className="bg-teal-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
