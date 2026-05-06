
import React from 'react';
import { HolidayPackage, PackageInclusion } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
        <span className="text-xs text-gray-600 ml-1.5 font-bold">{rating.toFixed(1)}</span>
    </div>
);

const InclusionIcon: React.FC<{ type: PackageInclusion }> = ({ type }) => {
    const icons: Record<PackageInclusion, React.JSX.Element> = {
        'Flights': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
        'Hotels': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
        'Tours': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        'Meals': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 12h18M3 21h18M5 3v18M19 3v18" /></svg>,
        'Transfers': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
        'Permits': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    };
    return <div title={type}>{icons[type]}</div>;
};

const PackageCard: React.FC<{ pkg: HolidayPackage; onSelect: (pkg: HolidayPackage) => void; }> = ({ pkg, onSelect }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col group">
            <div className="relative h-56">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={pkg.image} alt={pkg.title} />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                    {pkg.duration.days} Days / {pkg.duration.nights} Nights
                </div>
                <div className="absolute top-3 right-3">
                    <StarRating rating={pkg.rating} />
                </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div>
                    <span className="text-xs font-semibold text-rose-500 uppercase">{pkg.theme}</span>
                    <h3 className="text-xl font-bold text-gray-800 truncate mt-1">{pkg.title}</h3>
                    <p className="text-sm text-gray-500">{pkg.destinations.join(', ')}</p>
                    
                    <div className="mt-4 flex items-center gap-4 text-gray-600">
                        {pkg.inclusions.map(inc => <InclusionIcon key={inc} type={inc} />)}
                    </div>
                </div>
                <div className="mt-auto pt-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-500">Starts from</span>
                            <p className="text-2xl font-bold text-teal-600">₹{pkg.price.toLocaleString()}</p>
                        </div>
                        <button onClick={() => onSelect(pkg)} className="bg-teal-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;