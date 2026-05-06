
import React from 'react';
import { Activity } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);


const ActivityCard: React.FC<{ activity: Activity; onSelect: (activity: Activity) => void; }> = ({ activity, onSelect }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col group">
            <div className="relative h-56">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={activity.image} alt={activity.title} />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                    {activity.category}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors truncate">{activity.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{activity.location}</p>
                    
                     <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                            <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <StarRating rating={activity.rating} />
                            <span className="font-semibold">{activity.rating}</span>
                            <span className="text-gray-500">({activity.reviewsCount})</span>
                        </div>
                    </div>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-500">From</span>
                            <p className="text-2xl font-bold text-teal-600">₹{activity.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => onSelect(activity)} className="bg-teal-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
