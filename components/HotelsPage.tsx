
import React, { useState, useMemo } from 'react';
import { HOTELS, INDIA_DESTINATIONS } from '../constants';
import { Hotel, HotelAmenity } from '../types';
import HotelCard from './HotelCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const amenityOptions: HotelAmenity[] = ['Pool', 'WiFi', 'Parking', 'Restaurant', 'Gym', 'Pet Friendly', 'Spa'];

const HotelsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        price: 50000,
        rating: 0,
        amenities: [] as HotelAmenity[],
    });
    const [hasSearched, setHasSearched] = useState(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (name === 'amenities') {
            setFilters(prev => ({
                ...prev,
                amenities: checked ? [...prev.amenities, value as HotelAmenity] : prev.amenities.filter(a => a !== value)
            }));
        } else {
            setFilters(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
        }
    };
    
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSearched(true);
    }

    const filteredHotels = useMemo(() => {
        let hotels = hasSearched ? HOTELS : HOTELS.slice(0, 6); // Show featured if not searched

        if (hasSearched && searchQuery) {
             hotels = hotels.filter(hotel => 
                hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return hotels.filter(hotel => {
            const { price, rating, amenities } = filters;
            return (
                hotel.pricePerNight <= price &&
                hotel.rating >= rating &&
                amenities.every(amenity => hotel.amenities.includes(amenity))
            );
        });
    }, [searchQuery, filters, hasSearched]);

    const FilterSidebar = () => (
        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Filter Results</h3>
            <div className="space-y-6">
                {/* Price Filter */}
                <div>
                    <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Max Price</label>
                    <input type="range" id="price" name="price" min="5000" max="60000" step="1000" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                    <div className="text-center font-medium text-teal-600 mt-2">Up to ₹{filters.price.toLocaleString()} / night</div>
                </div>

                {/* Rating Filter */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Star Rating</h4>
                    <div className="flex justify-around bg-gray-100 rounded-lg p-1">
                        {[0, 3, 4, 5].map(star => (
                            <button key={star} onClick={() => setFilters(f => ({...f, rating: star}))}
                                className={`px-4 py-1.5 text-sm font-bold rounded-md transition ${filters.rating === star ? 'bg-teal-500 text-white shadow' : 'hover:bg-gray-200'}`}>
                                {star === 0 ? 'All' : `${star}★+`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amenities Filter */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {amenityOptions.map(amenity => (
                            <label key={amenity} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" name="amenities" value={amenity} checked={filters.amenities.includes(amenity)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="bg-gray-50 pt-20 min-h-screen">
             <div className="container mx-auto px-6 pt-8">
                 <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Home
                </button>
            </div>

            {/* Search Hero */}
            <section
                ref={ref as React.RefObject<HTMLElement>}
                className={`py-12 bg-teal-600 text-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
            >
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Find Your Perfect Stay</h1>
                    <p className="mt-2 text-lg text-teal-100">Search from thousands of hotels, villas, and homestays.</p>
                    <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mt-8">
                        <div className="relative">
                           <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4 px-6 text-lg text-black bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
                                placeholder="Enter a city or hotel name..."
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-bold py-3 px-8 rounded-full hover:bg-rose-600 transition-transform transform hover:scale-105">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>
            
            {/* Main Content */}
            <main className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    <FilterSidebar />
                    
                    {/* Hotel Listings */}
                    <div className="lg:col-span-3">
                         <h2 className="text-3xl font-bold mb-6">{hasSearched ? `Results for "${searchQuery}"` : "Featured Stays"}</h2>
                         {filteredHotels.length > 0 ? (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredHotels.map(hotel => (
                                    <HotelCard key={hotel.id} hotel={hotel} />
                                ))}
                            </div>
                         ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-700">No Hotels Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HotelsPage;
