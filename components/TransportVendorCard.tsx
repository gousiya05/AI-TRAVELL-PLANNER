import React from 'react';
import { TransportVendor } from '../types';

interface TransportVendorCardProps {
  vendor: TransportVendor;
  onBook: (vendor: TransportVendor) => void;
}

const TransportVendorCard: React.FC<TransportVendorCardProps> = ({ vendor, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      <img className="w-full h-56 object-cover" src={vendor.image} alt={vendor.model} />
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{vendor.name}</h3>
        <p className="text-gray-600">{vendor.model}</p>
        <p className="text-2xl font-bold text-teal-600 my-2">{vendor.price}</p>
        <div className="mt-auto">
          <button
            onClick={() => onBook(vendor)}
            className="w-full bg-teal-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-teal-600 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransportVendorCard;
