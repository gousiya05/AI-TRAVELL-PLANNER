
import React, { useState, useMemo } from 'react';
import { TRAINS_DATA, TRAIN_STATIONS } from '../constants';
import { Train, TrainClassInfo, TrainClassType, TrainStation, TrainType } from '../types';
import TrainCard from './TrainCard';
import TrainBookingModal from './TrainBookingModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const trainTypes: TrainType[] = ['Superfast', 'Express', 'Rajdhani', 'Shatabdi', 'Duronto'];
const classTypes: TrainClassType[] = ['1A', '2A', '3A', 'SL', 'CC', 'EC', '2S'];

// Helper to get today's date in YYYY-MM-DD format
const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TrainsPage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const { ref, isVisible } = useScrollAnimation();
    
    // Search State
    const [searchCriteria, setSearchCriteria] = useState({ from: '', to: '', date: getTodayString() });
    const [searchResults, setSearchResults] = useState<Train[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    // Filtering and Sorting State
    const [filters, setFilters] = useState({
        departureTime: [] as string[], // morning, afternoon, evening, night
        trainTypes: [] as TrainType[],
        classTypes: [] as TrainClassType[],
    });
    const [sortBy, setSortBy] = useState('Departure Time');
    const [visibleCount, setVisibleCount] = useState(5);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<{ train: Train, classInfo: TrainClassInfo } | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCriteria(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchCriteria.from && searchCriteria.to) {
            const results = TRAINS_DATA.filter(train =>
                train.fromStationCode === searchCriteria.from && train.toStationCode === searchCriteria.to
            );
            setSearchResults(results);
            setHasSearched(true);
            setVisibleCount(5); // Reset visible count on new search
        }
    };

     const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        const list = filters[name as 'departureTime' | 'trainTypes' | 'classTypes'];
        const updatedList = checked 
            ? [...list, value]
            : list.filter(item => item !== value);
        
        setFilters(prev => ({ ...prev, [name]: updatedList }));
    };

    const filteredAndSortedTrains = useMemo(() => {
        let trains = [...searchResults];

        // Apply filters
        trains = trains.filter(train => {
            const departureHour = parseInt(train.departureTime.split(':')[0], 10);
            
            const timeFilterMatch = filters.departureTime.length === 0 || filters.departureTime.some(slot => {
                if (slot === 'morning') return departureHour >= 6 && departureHour < 12;
                if (slot === 'afternoon') return departureHour >= 12 && departureHour < 18;
                if (slot === 'evening') return departureHour >= 18 && departureHour < 24;
                if (slot === 'night') return departureHour >= 0 && departureHour < 6;
                return false;
            });

            const typeFilterMatch = filters.trainTypes.length === 0 || filters.trainTypes.includes(train.type);
            const classFilterMatch = filters.classTypes.length === 0 || filters.classTypes.some(ct => train.classes.some(tc => tc.classType === ct));

            return timeFilterMatch && typeFilterMatch && classFilterMatch;
        });

        // Apply sorting
        switch(sortBy) {
            case 'Arrival Time':
                trains.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
                break;
            case 'Duration':
                trains.sort((a, b) => a.duration.localeCompare(b.duration));
                break;
            case 'Price: Low to High':
                trains.sort((a, b) => Math.min(...a.classes.map(c => c.fare)) - Math.min(...b.classes.map(c => c.fare)));
                break;
            case 'Departure Time':
            default:
                 trains.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                break;
        }

        return trains;
    }, [searchResults, filters, sortBy]);
    
    const handleBookNow = (train: Train, classInfo: TrainClassInfo) => {
        setSelectedBooking({ train, classInfo });
        setIsModalOpen(true);
    };
    
    const loadMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    const FilterComponent = () => (
        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
            <h3 className="text-xl font-bold mb-4">Filter By</h3>
            <div className="space-y-6">
                <div>
                    <h4 className="font-semibold mb-2">Departure Time</h4>
                    <div className="space-y-1">
                        {['morning', 'afternoon', 'evening', 'night'].map(time => (
                             <label key={time} className="flex items-center space-x-2 text-sm capitalize">
                                <input type="checkbox" name="departureTime" value={time} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span>{time}</span>
                            </label>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Train Type</h4>
                    <div className="space-y-1">
                        {trainTypes.map(type => (
                             <label key={type} className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" name="trainTypes" value={type} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Class</h4>
                    <div className="space-y-1">
                        {classTypes.map(type => (
                             <label key={type} className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" name="classTypes" value={type} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="bg-gray-100 pt-20 min-h-screen">
            <div className="container mx-auto px-6 pt-8">
                <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Home
                </button>
            </div>
            
            {/* Hero & Search Section */}
            <section
                ref={ref as React.RefObject<HTMLElement>}
                className={`py-12 bg-cover bg-center text-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1601205741636-1e374465b166?w=1200&q=80)'}}
            >
                <div className="bg-blue-900/60 py-12">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center">Seamless Rail Travel</h1>
                        <p className="mt-2 text-lg text-blue-100 text-center">Book your train tickets with ease and convenience.</p>
                        
                        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div>
                                    <label htmlFor="from" className="block text-sm font-medium">From</label>
                                    <input type="text" list="station-list" id="from" name="from" value={searchCriteria.from} onChange={handleSearchChange} required placeholder="Origin Station" className="mt-1 w-full p-2.5 rounded-md text-gray-900"/>
                                </div>
                                <div>
                                    <label htmlFor="to" className="block text-sm font-medium">To</label>
                                    <input type="text" list="station-list" id="to" name="to" value={searchCriteria.to} onChange={handleSearchChange} required placeholder="Destination Station" className="mt-1 w-full p-2.5 rounded-md text-gray-900"/>
                                </div>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium">Date</label>
                                        <input type="date" id="date" name="date" value={searchCriteria.date} min={getTodayString()} onChange={handleSearchChange} required className="mt-1 w-full p-2.5 rounded-md text-gray-900"/>
                                    </div>
                                    <button type="submit" className="w-full bg-rose-500 text-white font-bold py-2.5 rounded-md hover:bg-rose-600 transition-colors h-full self-end">
                                        Search Trains
                                    </button>
                                </div>
                            </div>
                            <datalist id="station-list">
                                {TRAIN_STATIONS.map(s => <option key={s.code} value={s.code}>{s.name} ({s.city})</option>)}
                            </datalist>
                        </form>
                    </div>
                </div>
            </section>
            
            {/* Results Section */}
            {hasSearched && (
                 <main className="container mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <FilterComponent />

                        <div className="lg:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Available Trains ({filteredAndSortedTrains.length})</h2>
                                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border border-gray-300 rounded-md p-2 focus:ring-teal-500">
                                    <option>Departure Time</option>
                                    <option>Arrival Time</option>
                                    <option>Duration</option>
                                    <option>Price: Low to High</option>
                                </select>
                            </div>

                            {filteredAndSortedTrains.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredAndSortedTrains.slice(0, visibleCount).map(train => (
                                        <TrainCard key={train.id} train={train} onBookNow={handleBookNow} />
                                    ))}
                                    {visibleCount < filteredAndSortedTrains.length && (
                                        <div className="text-center mt-8">
                                            <button onClick={loadMore} className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                    <h3 className="text-2xl font-semibold text-gray-700">No Trains Found</h3>
                                    <p className="text-gray-500 mt-2">No direct trains match your search criteria and filters. Try changing your search or removing some filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            )}

            <TrainBookingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bookingDetails={selectedBooking}
            />
        </div>
    );
};

export default TrainsPage;
