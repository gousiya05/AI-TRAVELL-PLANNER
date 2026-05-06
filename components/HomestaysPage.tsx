
import React, { useState, useMemo } from 'react';
import { HOMESTAYS } from '../constants';
import { Homestay, HomestayAmenity, HomestayType } from '../types';
import HomestayCard from './HomestayCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const amenityOptions: HomestayAmenity[] = ['Pool', 'Kitchen', 'WiFi', 'Parking', 'Pet Friendly', 'Air Conditioning'];
const propertyTypeOptions: HomestayType[] = ['Villa', 'Apartment', 'Farm Stay', 'Bungalow', 'Houseboat', 'Cottage'];

const HomestaysPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        price: 30000,
        propertyType: [] as HomestayType[],
        amenities: [] as HomestayAmenity[],
    });
    const [hasSearched, setHasSearched] = useState(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (name === 'amenities' || name === 'propertyType') {
            const currentList = filters[name];
            const updatedList = checked 
                ? [...currentList, value as any] 
                : currentList.filter(item => item !== value);
            
            setFilters(prev => ({ ...prev, [name]: updatedList }));
        } else {
            setFilters(prev => ({ ...prev, [name]: type === 'range' ? Number(value) : value }));
        }
    };
    
    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSearched(true);
    }

    const filteredHomestays = useMemo(() => {
        let homestays = hasSearched ? HOMESTAYS : HOMESTAYS.slice(0, 6);

        if (hasSearched && searchQuery) {
             homestays = homestays.filter(stay => 
                stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                stay.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return homestays.filter(stay => {
            const { price, propertyType, amenities } = filters;
            return (
                stay.pricePerNight <= price &&
                (propertyType.length === 0 || propertyType.includes(stay.type)) &&
                amenities.every(amenity => stay.amenities.includes(amenity))
            );
        });
    }, [searchQuery, filters, hasSearched]);

    const FilterSidebar = () => (
        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Filter By</h3>
            <div className="space-y-6">
                {/* Price Filter */}
                <div>
                    <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Max Price</label>
                    <input type="range" id="price" name="price" min="5000" max="30000" step="1000" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                    <div className="text-center font-medium text-teal-600 mt-2">Up to ₹{filters.price.toLocaleString()} / night</div>
                </div>

                {/* Property Type Filter */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Property Type</h4>
                    <div className="space-y-2">
                        {propertyTypeOptions.map(type => (
                            <label key={type} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" name="propertyType" value={type} checked={filters.propertyType.includes(type)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span>{type}</span>
                            </label>
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
                className={`py-12 bg-green-600 text-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
            >
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold">Your Home Away From Home</h1>
                    <p className="mt-2 text-lg text-green-100">Discover unique villas, apartments, and cottages.</p>
                    <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mt-8">
                        <div className="relative">
                           <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4 px-6 text-lg text-black bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400 transition"
                                placeholder="Enter a destination..."
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
                    
                    {/* Homestay Listings */}
                    <div className="lg:col-span-3">
                         <h2 className="text-3xl font-bold mb-6">{hasSearched ? `Results for "${searchQuery}"` : "Top-Rated Homestays"}</h2>
                         {filteredHomestays.length > 0 ? (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredHomestays.map(stay => (
                                    <HomestayCard key={stay.id} homestay={stay} />
                                ))}
                            </div>
                         ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-700">No Properties Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters to find the perfect stay.</p>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomestaysPage;
