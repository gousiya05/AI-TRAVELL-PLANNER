
import React from 'react';
import { Homestay } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const HomestayCard: React.FC<{ homestay: Homestay }> = ({ homestay }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col group">
            <div className="relative h-56">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={homestay.image} alt={homestay.name} />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                    {homestay.type}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 truncate">{homestay.name}</h3>
                    <p className="text-sm text-gray-500">{homestay.location}</p>
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                            <span>{homestay.maxGuests} Guests</span>
                        </div>
                         <div className="flex items-center gap-1">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm2-4a2 2 0 012-2h6a2 2 0 012 2v2H5V3z" /></svg>
                            <span>{homestay.bedrooms} Bedrooms</span>
                        </div>
                        <div className="flex items-center gap-1">
                           <StarRating rating={homestay.rating} />
                           <span className="font-semibold">{homestay.rating.toFixed(1)}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xl font-bold text-teal-600">₹{homestay.pricePerNight.toLocaleString()}<span className="text-sm font-normal text-gray-600">/night</span></p>
                        </div>
                        <button onClick={() => alert(`Booking for ${homestay.name} is a demo feature.`)} className="bg-teal-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomestayCard;
