import React, { useState, useEffect, useMemo } from 'react';
import { Destination, AIGeneratedDetails, Guide } from '../types';
import { fetchDestinationDetails } from '../services/geminiService';
import { TOUR_GUIDES } from '../constants';
import Loader from './Loader';
import GuideCard from './GuideCard';
import GuideDetailModal from './GuideDetailModal';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onBookTrip: () => void;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose, onBookTrip }) => {
  const [details, setDetails] = useState<AIGeneratedDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);


  useEffect(() => {
    if (destination) {
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
    } else {
      setDetails(null);
      setError(null);
      setLoading(false);
    }
  }, [destination]);

  const topGuides = useMemo(() => {
    if (!destination) return [];
    return TOUR_GUIDES
      .filter(guide => guide.location === destination.name)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }, [destination]);

  const handleSelectGuide = (guide: Guide) => {
    setSelectedGuide(guide);
    setShowGuideModal(true);
  }

  if (!destination) {
    return null;
  }

  const theme = destination.theme;

  return (
    <>
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300 ${
          destination ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div
          className={`relative w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] bg-white md:rounded-2xl shadow-2xl flex flex-col transform transition-transform duration-500 ${
            destination ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <header className="relative h-64 md:h-80 w-full rounded-t-2xl overflow-hidden">
            <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl">{destination.name}</h1>
              <h2 className="text-xl text-white/90 drop-shadow-lg">{destination.state}</h2>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex-grow overflow-y-auto p-6 md:p-8">
            {loading ? (
              <div className="flex justify-center items-center h-64"><Loader /></div>
            ) : error ? (
              <div className="text-center text-red-500 bg-red-100 p-8 rounded-lg">Error: {error}</div>
            ) : details && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <p className="text-lg text-gray-700 leading-relaxed">{details.description}</p>
                  <section>
                    <h3 className={`text-2xl font-bold ${theme.accent} border-b-2 ${theme.primary.replace('bg-','border-')} pb-2 mb-4`}>Top Attractions</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {details.highlights.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                  <section>
                    <h3 className={`text-2xl font-bold ${theme.accent} border-b-2 ${theme.primary.replace('bg-','border-')} pb-2 mb-4`}>Local Foods to Try</h3>
                     <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {details.localFoods.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </section>
                </div>
                <aside className="space-y-6">
                  <div className={`${theme.secondary} p-4 rounded-lg`}>
                    <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Best Time to Visit</h4>
                    <p className="text-sm text-gray-700">{details.weatherInfo}</p>
                  </div>
                  <div className={`${theme.secondary} p-4 rounded-lg`}>
                    <h4 className={`font-bold text-lg ${theme.accent} mb-2`}>Cultural Facts</h4>
                     <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {details.culturalFacts.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                </aside>
              </div>
            )}
             {topGuides.length > 0 && (
              <section className="mt-12">
                <h3 className={`text-2xl font-bold ${theme.accent} border-b-2 ${theme.primary.replace('bg-','border-')} pb-2 mb-4`}>
                  Top Local Guides in {destination.name}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topGuides.map(guide => (
                     <GuideCard key={guide.id} guide={guide} onSelect={handleSelectGuide} />
                  ))}
                </div>
              </section>
            )}
          </div>
          <footer className="p-4 bg-gray-50 border-t rounded-b-2xl flex justify-end">
              <button onClick={onBookTrip} className={`px-8 py-3 ${theme.primary} text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-transform transform hover:scale-105`}>
                  Book My Trip
              </button>
          </footer>
        </div>
      </div>
      <GuideDetailModal
        guide={selectedGuide}
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />
    </>
  );
};

export default DestinationModal;
