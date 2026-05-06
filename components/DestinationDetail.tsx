
import React, { useState, useEffect } from 'react';
import { Destination, AIGeneratedDetails } from '../types';
import { fetchDestinationDetails } from '../services/geminiService';
import Loader from './Loader';

interface DestinationDetailProps {
  destination: Destination;
  onBack: () => void;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ destination, onBack }) => {
  const [details, setDetails] = useState<AIGeneratedDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDestinationDetails(destination.name);
        setDetails(data);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [destination.name]);

  const renderContent = () => {
    if (loading) return <div className="flex justify-center items-center h-96"><Loader /></div>;
    if (error) return <div className="text-center text-red-500 bg-red-100 p-8 rounded-lg">Error: {error}</div>;
    if (!details) return <div className="text-center text-gray-500">No details available.</div>;

    return (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">Description</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{details.description}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">Highlights</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            {details.highlights.map((highlight, index) => <li key={index}>{highlight}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">3-Day Itinerary</h2>
          <div className="space-y-6">
            {details.threeDayItinerary.map((day) => (
              <div key={day.day} className="p-4 bg-teal-50 rounded-lg">
                <h3 className="font-semibold text-xl text-teal-800">Day {day.day}: {day.title}</h3>
                <p className="mt-2 text-gray-600">{day.activities}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">Travel Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            {details.travelTips.map((tip, index) => <li key={index}>{tip}</li>)}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-4">Weather</h2>
          <p className="text-lg text-gray-700">{details.weatherInfo}</p>
        </section>
      </div>
    );
  };
  
  return (
    <div className="pt-20 bg-white">
      <div className="relative h-96">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-5xl font-extrabold text-white drop-shadow-xl">{destination.name}</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16 max-w-4xl">
         <div className="flex justify-between items-center mb-12">
            <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Back to Places
            </button>
            <a href="#contact" className="px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105">
                Book Now
            </a>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default DestinationDetail;
