
import React from 'react';
import { Bus, BusAmenity } from '../types';

const AmenityIcon: React.FC<{ type: BusAmenity }> = ({ type }) => {
    const icons: Record<BusAmenity, React.JSX.Element> = {
        'WiFi': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008z" /></svg>,
        'Water Bottle': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 21v-3.375A3.375 3.375 0 0010.125 14.25h-6.25A3.375 3.375 0 00.5 17.625V21" /></svg>,
        'Blanket': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4zm0 4h16M4 12h16M4 16h16" /></svg>,
        'Charging Point': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        'Live Tracking': <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };
    return <div className="text-gray-500" title={type}>{icons[type]}</div>;
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center gap-1">
        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">/ 5</span>
    </div>
);


const BusCard: React.FC<{ bus: Bus; onViewSeats: (bus: Bus) => void; }> = ({ bus, onViewSeats }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-48 p-4 flex flex-col items-center justify-center border-r border-gray-100">
                    <h3 className="text-lg font-bold text-purple-800 text-center">{bus.operatorName}</h3>
                    <p className="text-sm text-gray-500 text-center mt-1">{bus.busType}</p>
                    <div className="mt-2"><StarRating rating={bus.rating} /></div>
                </div>
                <div className="p-4 flex-grow">
                     <div className="flex justify-between items-center">
                        <div>
                            <p className="text-2xl font-bold">{bus.departureTime}</p>
                            <p className="text-sm font-medium text-gray-600 truncate">{bus.fromCity}</p>
                        </div>
                        <div className="text-center px-2">
                            <p className="text-sm font-semibold text-gray-700">{bus.duration}</p>
                            <div className="w-16 h-px bg-gray-300"></div>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{bus.arrivalTime}</p>
                            <p className="text-sm font-medium text-gray-600 truncate text-right">{bus.toCity}</p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            {bus.amenities.map(a => <AmenityIcon key={a} type={a} />)}
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Starts from</p>
                            <p className="text-xl font-bold text-teal-600">₹{bus.price.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="md:flex-shrink-0 md:w-40 p-4 flex flex-col items-center justify-center border-l border-gray-100 bg-gray-50">
                     <p className="font-bold text-lg">{bus.availableSeats} Seats Left</p>
                     <button
                        onClick={() => onViewSeats(bus)}
                        className="mt-2 w-full bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
                     >
                         View Seats
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusCard;
