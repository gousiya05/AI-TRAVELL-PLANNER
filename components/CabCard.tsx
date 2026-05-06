
import React, { useState } from 'react';
import { Cab } from '../types';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center gap-1">
        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        <span className="font-bold text-gray-700">{rating.toFixed(1)}</span>
    </div>
);

const CabCard: React.FC<{ cab: Cab; onBookNow: (cab: Cab) => void; }> = ({ cab, onBookNow }) => {
    const [fareDetailsVisible, setFareDetailsVisible] = useState(false);
    const { fareDetails } = cab;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-56">
                    <img className="h-48 w-full object-cover md:h-full" src={cab.image} alt={cab.carModel} />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <div>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{cab.carCategory}</div>
                        <h3 className="block mt-1 text-lg leading-tight font-bold text-black">{cab.carModel}</h3>
                        <div className="mt-2 flex items-center text-gray-500 gap-4">
                            <StarRating rating={cab.rating} />
                            <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg> {cab.capacity} Passengers</div>
                            <div className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M3 7v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" /></svg> {cab.luggage} Bags</div>
                        </div>
                    </div>

                    <div className="mt-4 flex-grow flex flex-col justify-end">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-2xl font-bold text-teal-600">₹{cab.price.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">All inclusive price</p>
                            </div>
                            <button onClick={() => onBookNow(cab)} className="px-6 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                                Book Now
                            </button>
                        </div>
                        <button onClick={() => setFareDetailsVisible(!fareDetailsVisible)} className="text-sm text-indigo-500 hover:text-indigo-700 mt-2 text-left">
                            {fareDetailsVisible ? 'Hide' : 'Show'} Fare Details {fareDetailsVisible ? '▴' : '▾'}
                        </button>
                    </div>
                </div>
            </div>
            {fareDetailsVisible && (
                <div className="p-4 bg-gray-50 border-t transition-all duration-300">
                    <h4 className="font-bold mb-2">Fare Breakdown</h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="text-gray-600">Base Fare: <span className="font-semibold text-black">₹{fareDetails.baseFare.toLocaleString()}</span></div>
                        {fareDetails.driverAllowance && <div className="text-gray-600">Driver Allowance: <span className="font-semibold text-black">₹{fareDetails.driverAllowance.toLocaleString()}</span></div>}
                        {fareDetails.tolls && <div className="text-gray-600">Tolls: <span className="font-semibold text-black">₹{fareDetails.tolls.toLocaleString()}</span></div>}
                        {fareDetails.stateTax && <div className="text-gray-600">State Tax: <span className="font-semibold text-black">₹{fareDetails.stateTax.toLocaleString()}</span></div>}
                        <div className="text-gray-600">GST: <span className="font-semibold text-black">₹{fareDetails.gst.toLocaleString()}</span></div>
                    </div>
                     <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <h5 className="font-semibold text-green-600">Inclusions</h5>
                            <ul className="list-disc list-inside text-xs">{fareDetails.inclusions.map(i => <li key={i}>{i}</li>)}</ul>
                        </div>
                        <div>
                             <h5 className="font-semibold text-red-600">Exclusions</h5>
                            <ul className="list-disc list-inside text-xs">{fareDetails.exclusions.map(e => <li key={e}>{e}</li>)}</ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CabCard;
