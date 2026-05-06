import React, { useState } from 'react';
import { INDIA_DESTINATIONS } from '../constants';
import LocalTransport from './LocalTransport';

const FlightSearch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchComplete, setSearchComplete] = useState(false);
  const [destination, setDestination] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dest = formData.get('destination') as string;
    setDestination(dest);
    setSearchComplete(true);
    
    // Scroll to the local transport section after a short delay
    setTimeout(() => {
        document.getElementById('local-transport-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <section className="py-20 pt-24 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
          <h2 className="text-center text-4xl font-bold mb-8">
            <span className="text-teal-600">Fly</span> Cheap
          </h2>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure City</label>
                <input type="text" id="departure" name="departure" required placeholder="e.g., Mumbai" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination City</label>
                <select id="destination" name="destination" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 bg-white">
                    <option value="" disabled>Select a destination</option>
                    {INDIA_DESTINATIONS.map(d => (
                        <option key={d.name} value={d.name}>{d.name}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label htmlFor="departure-date" className="block text-sm font-medium text-gray-700">Departure Date</label>
                <input type="date" id="departure-date" name="departure-date" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
              </div>
              <div>
                <label htmlFor="return-date" className="block text-sm font-medium text-gray-700">Return Date</label>
                <input type="date" id="return-date" name="return-date" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
              </div>
            </div>
            <div>
              <button type="submit" className="w-full mt-4 py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105">
                Search Flights
              </button>
            </div>
          </form>
        </div>
        
        {searchComplete && (
            <div className="max-w-2xl mx-auto mt-8 text-center p-4 bg-green-100 text-green-800 rounded-lg">
                <p><strong>Flight search complete!</strong> Now, let's arrange your local transport in <strong>{destination}</strong>.</p>
            </div>
        )}
      </div>
      
      {searchComplete && destination && (
        <LocalTransport destination={destination} />
      )}
    </section>
  );
};

export default FlightSearch;