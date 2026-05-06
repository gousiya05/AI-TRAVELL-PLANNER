import React, { useState, useMemo } from 'react';
import { TOUR_GUIDES, INDIA_DESTINATIONS, TOUR_TYPE_STYLES } from '../constants';
import { Guide } from '../types';
import GuideCard from './GuideCard';
import Modal from './Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GuideFinder: React.FC = () => {
    const { ref, isVisible } = useScrollAnimation();
    const [filters, setFilters] = useState({
        destination: '',
        tourType: '',
        rating: 0,
        language: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
    const [visibleCount, setVisibleCount] = useState(9);

    const languages = useMemo(() => {
        const allLangs = TOUR_GUIDES.flatMap(g => g.languages);
        return [...new Set(allLangs)].sort();
    }, []);

    const filteredGuides = useMemo(() => {
        return TOUR_GUIDES
            .filter(guide => {
                const { destination, tourType, rating, language } = filters;
                return (
                    (destination === '' || guide.location === destination) &&
                    (tourType === '' || guide.tourType === tourType) &&
                    (rating === 0 || guide.rating >= rating) &&
                    (language === '' || guide.languages.includes(language))
                );
            })
            .sort((a, b) => b.rating - a.rating);
    }, [filters]);
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setVisibleCount(9);
    };

    const handleSelectGuide = (guide: Guide) => {
        setSelectedGuide(guide);
        setIsModalOpen(true);
    };
    
    const loadMore = () => {
        setVisibleCount(prev => prev + 9);
    };

    return (
        <>
            <section 
                ref={ref as React.RefObject<HTMLElement>}
                className={`py-16 bg-gradient-to-b from-teal-50 to-white rounded-2xl animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
            >
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-extrabold mb-2">
                        <span className="text-teal-600">Meet Your</span> Local Guide
                    </h3>
                    <p className="max-w-2xl mx-auto text-gray-600">
                        Connect with expert local guides to make your Indian journey truly authentic and unforgettable.
                    </p>
                </div>
                
                {/* Filters */}
                <div className="mb-8 p-4 bg-white rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <select name="destination" value={filters.destination} onChange={handleFilterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                        <option value="">All Destinations</option>
                        {INDIA_DESTINATIONS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    <select name="tourType" value={filters.tourType} onChange={handleFilterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                        <option value="">All Tour Types</option>
                        {Object.keys(TOUR_TYPE_STYLES).map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select name="language" value={filters.language} onChange={handleFilterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                        <option value="">All Languages</option>
                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                    </select>
                    <select name="rating" value={filters.rating} onChange={handleFilterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                        <option value="0">Any Rating</option>
                        <option value="4.8">4.8+ Stars</option>
                        <option value="4.5">4.5+ Stars</option>
                        <option value="4">4+ Stars</option>
                    </select>
                </div>

                {/* Guide Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredGuides.slice(0, visibleCount).map(guide => (
                        <GuideCard key={guide.id} guide={guide} onSelect={handleSelectGuide} />
                    ))}
                </div>
                
                {filteredGuides.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <h4 className="text-2xl font-semibold text-gray-700">No Guides Found</h4>
                        <p className="text-gray-500 mt-2">Try adjusting your filters to find the perfect guide for your trip!</p>
                    </div>
                )}
                
                {visibleCount < filteredGuides.length && (
                    <div className="text-center mt-12">
                        <button onClick={loadMore} className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                            Load More Guides
                        </button>
                    </div>
                )}
            </section>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedGuide && (
                    <div className="text-center p-6">
                        <img src={selectedGuide.image} alt={selectedGuide.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-teal-200" />
                        <h3 className="text-2xl font-bold mb-2">Guide Selected!</h3>
                        <p className="text-gray-600 text-lg">
                            You've selected <span className="font-semibold text-teal-600">{selectedGuide.name}</span> for your trip to <span className="font-semibold">{selectedGuide.location}</span>.
                        </p>
                        <button onClick={() => setIsModalOpen(false)} className="mt-6 w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition">
                            Confirm & Proceed (Demo)
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default GuideFinder;
