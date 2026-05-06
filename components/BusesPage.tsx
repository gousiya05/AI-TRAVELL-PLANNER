
import React, { useState, useMemo } from 'react';
import { BUSES_DATA, BUS_STOPS } from '../constants';
import { Bus, BusType, BusAmenity } from '../types';
import BusCard from './BusCard';
import SeatSelectionModal from './SeatSelectionModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const busTypes: BusType[] = ['AC Sleeper', 'Non-AC Seater', 'AC Seater', 'Volvo Multi-Axle', 'Semi-Sleeper'];
const amenityTypes: BusAmenity[] = ['WiFi', 'Water Bottle', 'Blanket', 'Charging Point', 'Live Tracking'];

const getTodayString = () => new Date().toISOString().split('T')[0];

const BusesPage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const { ref, isVisible } = useScrollAnimation();
    
    const [searchCriteria, setSearchCriteria] = useState({ from: '', to: '', date: getTodayString() });
    const [searchResults, setSearchResults] = useState<Bus[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    const [filters, setFilters] = useState({
        departureTime: [] as string[],
        busTypes: [] as BusType[],
        amenities: [] as BusAmenity[],
    });
    const [sortBy, setSortBy] = useState('Departure Time');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCriteria(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchCriteria.from && searchCriteria.to) {
            const results = BUSES_DATA.filter(bus =>
                bus.fromCity.toLowerCase().includes(searchCriteria.from.toLowerCase()) &&
                bus.toCity.toLowerCase().includes(searchCriteria.to.toLowerCase())
            );
            setSearchResults(results);
            setHasSearched(true);
        }
    };
    
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        const list = filters[name as 'departureTime' | 'busTypes' | 'amenities'];
        const updatedList = checked ? [...list, value] : list.filter(item => item !== value);
        setFilters(prev => ({ ...prev, [name]: updatedList as any }));
    };
    
    const filteredAndSortedBuses = useMemo(() => {
        let buses = [...searchResults];

        buses = buses.filter(bus => {
            const departureHour = parseInt(bus.departureTime.split(':')[0], 10);
            
            const timeFilterMatch = filters.departureTime.length === 0 || filters.departureTime.some(slot => {
                if (slot === 'morning') return departureHour >= 6 && departureHour < 12;
                if (slot === 'afternoon') return departureHour >= 12 && departureHour < 18;
                if (slot === 'evening') return departureHour >= 18 && departureHour < 24;
                if (slot === 'night') return departureHour >= 0 && departureHour < 6;
                return false;
            });
            const typeFilterMatch = filters.busTypes.length === 0 || filters.busTypes.includes(bus.busType);
            const amenityFilterMatch = filters.amenities.length === 0 || filters.amenities.every(a => bus.amenities.includes(a));
            
            return timeFilterMatch && typeFilterMatch && amenityFilterMatch;
        });

        switch(sortBy) {
            case 'Arrival Time':
                buses.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
                break;
            case 'Duration':
                buses.sort((a, b) => a.duration.localeCompare(b.duration));
                break;
            case 'Price: Low to High':
                buses.sort((a, b) => a.price - b.price);
                break;
            case 'Departure Time':
            default:
                 buses.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
                break;
        }

        return buses;
    }, [searchResults, filters, sortBy]);

    const handleViewSeats = (bus: Bus) => {
        setSelectedBus(bus);
        setIsModalOpen(true);
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
                    <h4 className="font-semibold mb-2">Bus Type</h4>
                    <div className="space-y-1">
                        {busTypes.map(type => (
                             <label key={type} className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" name="busTypes" value={type} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="space-y-1">
                        {amenityTypes.map(type => (
                             <label key={type} className="flex items-center space-x-2 text-sm">
                                <input type="checkbox" name="amenities" value={type} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                                <span>{type}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );

    const cityList = useMemo(() => [...new Set(BUS_STOPS.map(s => s.city))], []);

    return (
        <div className="bg-gray-100 pt-20 min-h-screen">
            <div className="container mx-auto px-6 pt-8">
                <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Home
                </button>
            </div>
            
            <section
                ref={ref as React.RefObject<HTMLElement>}
                className={`py-12 bg-cover bg-center text-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80)'}}
            >
                <div className="bg-purple-900/60 py-12">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center">Book Bus Tickets Online</h1>
                        <p className="mt-2 text-lg text-purple-100 text-center">Your journey, your way. Find the best bus for your route.</p>
                        
                        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <input type="text" list="city-list" name="from" value={searchCriteria.from} onChange={handleSearchChange} required placeholder="From City" className="w-full p-2.5 rounded-md text-gray-900"/>
                                <input type="text" list="city-list" name="to" value={searchCriteria.to} onChange={handleSearchChange} required placeholder="To City" className="w-full p-2.5 rounded-md text-gray-900"/>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" name="date" value={searchCriteria.date} min={getTodayString()} onChange={handleSearchChange} required className="w-full p-2.5 rounded-md text-gray-900"/>
                                    <button type="submit" className="w-full bg-rose-500 text-white font-bold py-2.5 rounded-md hover:bg-rose-600 transition-colors h-full">Search Buses</button>
                                </div>
                            </div>
                            <datalist id="city-list">
                                {cityList.map(city => <option key={city} value={city} />)}
                            </datalist>
                        </form>
                    </div>
                </div>
            </section>
            
            {hasSearched && (
                 <main className="container mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <FilterComponent />
                        <div className="lg:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Available Buses ({filteredAndSortedBuses.length})</h2>
                                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border border-gray-300 rounded-md p-2 focus:ring-teal-500">
                                    <option>Departure Time</option>
                                    <option>Arrival Time</option>
                                    <option>Duration</option>
                                    <option>Price: Low to High</option>
                                </select>
                            </div>
                            {filteredAndSortedBuses.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredAndSortedBuses.map(bus => (
                                        <BusCard key={bus.id} bus={bus} onViewSeats={handleViewSeats} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                    <h3 className="text-2xl font-semibold text-gray-700">No Buses Found</h3>
                                    <p className="text-gray-500 mt-2">No buses match your search. Try changing your search or filters.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            )}

            <SeatSelectionModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                bus={selectedBus}
            />
        </div>
    );
};

export default BusesPage;
