
import React, { useState, useMemo } from 'react';
import { HOLIDAY_PACKAGES } from '../constants';
import { HolidayPackage, PackageTheme, AccommodationType } from '../types';
import PackageCard from './PackageCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const themes: PackageTheme[] = ['Adventure', 'Beach', 'Cultural', 'Family', 'Hill Station', 'Romantic', 'Wildlife'];
const accommodationTypes: AccommodationType[] = ['Budget', 'Mid-range', 'Luxury'];

const HolidayPackagesPage: React.FC<{ onBack: () => void; onSelectPackage: (pkg: HolidayPackage) => void; }> = ({ onBack, onSelectPackage }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortBy, setSortBy] = useState('Popularity');
    const [filters, setFilters] = useState({
        price: 80000,
        themes: [] as PackageTheme[],
        accommodation: [] as AccommodationType[],
        duration: '', // e.g., '1-3', '4-7', '8-14', '15+'
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            const list = filters[name as 'themes' | 'accommodation'];
            const updatedList = checked 
                ? [...list, value]
                : list.filter(item => item !== value);
            setFilters(prev => ({ ...prev, [name]: updatedList }));
        } else {
            setFilters(prev => ({ ...prev, [name]: type === 'range' ? Number(value) : value }));
        }
    };
    
    const filteredAndSortedPackages = useMemo(() => {
        let packages = HOLIDAY_PACKAGES.filter(p => {
            const searchMatch = searchQuery.trim() === '' || 
                                p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                p.destinations.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
            
            const priceMatch = p.price <= filters.price;
            const themeMatch = filters.themes.length === 0 || filters.themes.includes(p.theme);
            const accommodationMatch = filters.accommodation.length === 0 || filters.accommodation.includes(p.accommodationType);
            
            const durationMatch = !filters.duration || (
                (filters.duration === '1-3' && p.duration.days >= 1 && p.duration.days <= 3) ||
                (filters.duration === '4-7' && p.duration.days >= 4 && p.duration.days <= 7) ||
                (filters.duration === '8-14' && p.duration.days >= 8 && p.duration.days <= 14) ||
                (filters.duration === '15+' && p.duration.days >= 15)
            );

            return searchMatch && priceMatch && themeMatch && accommodationMatch && durationMatch;
        });

        switch (sortBy) {
            case 'Price: Low to High':
                packages.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                packages.sort((a, b) => b.price - a.price);
                break;
            case 'Popularity':
            default:
                packages.sort((a, b) => b.rating - a.rating);
                break;
        }

        return packages;
    }, [searchQuery, filters, sortBy]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const FilterSidebar = () => (
        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Filter Packages</h3>
            <div className="space-y-6">
                <div>
                    <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Max Price</label>
                    <input type="range" id="price" name="price" min="20000" max="80000" step="1000" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                    <div className="text-center font-medium text-teal-600 mt-2">Up to ₹{filters.price.toLocaleString()}</div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Duration (Days)</h4>
                     <select name="duration" value={filters.duration} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500">
                        <option value="">Any</option>
                        <option value="1-3">1 - 3 Days</option>
                        <option value="4-7">4 - 7 Days</option>
                        <option value="8-14">8 - 14 Days</option>
                        <option value="15+">15+ Days</option>
                    </select>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Themes</h4>
                    <div className="space-y-2">
                        {themes.map(theme => (
                            <label key={theme} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" name="themes" value={theme} checked={filters.themes.includes(theme)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span>{theme}</span>
                            </label>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Accommodation</h4>
                    <div className="space-y-2">
                        {accommodationTypes.map(type => (
                            <label key={type} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" name="accommodation" value={type} checked={filters.accommodation.includes(type)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span>{type}</span>
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

            <section
                ref={ref as React.RefObject<HTMLElement>}
                className={`py-12 bg-cover bg-center text-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&auto=format&fit=crop&q=60)'}}
            >
                <div className="bg-black/50 py-12">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold">Curated Holiday Experiences</h1>
                        <p className="mt-2 text-lg text-gray-200">Discover your next adventure with our expertly crafted packages.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto mt-8">
                            <div className="relative">
                               <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-4 px-6 text-lg text-black bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
                                    placeholder="Search by destination or package name (e.g., Kerala, Golden Triangle)"
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-bold py-3 px-8 rounded-full hover:bg-rose-600 transition-transform transform hover:scale-105">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            
            <main className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    <FilterSidebar />
                    
                    <div className="lg:col-span-3">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold">Our Packages ({filteredAndSortedPackages.length})</h2>
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border border-gray-300 rounded-md p-2 focus:ring-teal-500">
                                <option>Popularity</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                         </div>
                         {filteredAndSortedPackages.length > 0 ? (
                             <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {filteredAndSortedPackages.slice(0, visibleCount).map(pkg => (
                                        <PackageCard key={pkg.id} pkg={pkg} onSelect={onSelectPackage} />
                                    ))}
                                </div>
                                {visibleCount < filteredAndSortedPackages.length && (
                                    <div className="text-center mt-12">
                                        <button onClick={loadMore} className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                                            Load More
                                        </button>
                                    </div>
                                )}
                             </>
                         ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-700">No Packages Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HolidayPackagesPage;
