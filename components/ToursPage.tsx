
import React, { useState, useMemo } from 'react';
import { ACTIVITIES_DATA, ACTIVITY_CATEGORIES } from '../constants';
import { Activity, ActivityCategory } from '../types';
import ActivityCard from './ActivityCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ratingOptions = [
    { label: 'Any', value: 0 },
    { label: '4.5+', value: 4.5 },
    { label: '4.0+', value: 4.0 },
    { label: '3.5+', value: 3.5 },
];

const durationOptions = [
    { label: 'Any', value: '' },
    { label: 'Under 3 Hours', value: 'short' },
    { label: 'Half Day (3-5h)', value: 'half' },
    { label: 'Full Day (5h+)', value: 'full' },
];

const ToursPage: React.FC<{ onBack: () => void; onSelectActivity: (activity: Activity) => void; }> = ({ onBack, onSelectActivity }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortBy, setSortBy] = useState('Popularity');
    const [filters, setFilters] = useState({
        price: 10000,
        categories: [] as ActivityCategory[],
        rating: 0,
        duration: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            const list = filters.categories;
            const updatedList = checked 
                ? [...list, value as ActivityCategory]
                : list.filter(item => item !== value);
            setFilters(prev => ({ ...prev, categories: updatedList }));
        } else {
            setFilters(prev => ({ ...prev, [name]: (name === 'price' || name === 'rating') ? Number(value) : value }));
        }
    };

    const filteredAndSortedActivities = useMemo(() => {
        let activities = ACTIVITIES_DATA.filter(p => {
            const searchMatch = searchQuery.trim() === '' ||
                                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                p.location.toLowerCase().includes(searchQuery.toLowerCase());
            
            const priceMatch = p.price <= filters.price;
            const categoryMatch = filters.categories.length === 0 || filters.categories.includes(p.category);
            const ratingMatch = p.rating >= filters.rating;

            const durationToHours = (durationStr: string) => parseFloat(durationStr);
            const durationHours = durationToHours(p.duration);
            const durationMatch = !filters.duration || (
                (filters.duration === 'short' && durationHours < 3) ||
                (filters.duration === 'half' && durationHours >= 3 && durationHours <= 5) ||
                (filters.duration === 'full' && durationHours > 5)
            );

            return searchMatch && priceMatch && categoryMatch && ratingMatch && durationMatch;
        });

        switch (sortBy) {
            case 'Price: Low to High':
                activities.sort((a, b) => a.price - b.price);
                break;
            case 'Price: High to Low':
                activities.sort((a, b) => b.price - a.price);
                break;
            case 'Rating':
                activities.sort((a,b) => b.rating - a.rating);
                break;
            case 'Popularity':
            default:
                activities.sort((a, b) => b.reviewsCount - a.reviewsCount);
                break;
        }

        return activities;
    }, [searchQuery, filters, sortBy]);

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const FilterSidebar = () => (
        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Filter Activities</h3>
            <div className="space-y-6">
                <div>
                    <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Max Price</label>
                    <input type="range" id="price" name="price" min="1000" max="10000" step="500" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" />
                    <div className="text-center font-medium text-teal-600 mt-2">Up to ₹{filters.price.toLocaleString()}</div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Categories</h4>
                    <div className="space-y-2">
                        {ACTIVITY_CATEGORIES.map(cat => (
                            <label key={cat.name} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" name="categories" value={cat.name} checked={filters.categories.includes(cat.name)} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"/>
                                <span>{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Duration</h4>
                     <select name="duration" value={filters.duration} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 bg-white">
                        {durationOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Rating</h4>
                     <select name="rating" value={filters.rating} onChange={handleFilterChange} className="w-full p-2 border border-gray-300 rounded-md focus:ring-teal-500 bg-white">
                        {ratingOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
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
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518022525094-218670c17523?w=1200&q=80)'}}
            >
                <div className="bg-black/50 py-12">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold">Unforgettable Experiences Await</h1>
                        <p className="mt-2 text-lg text-gray-200">Discover and book tours, activities, and attractions worldwide.</p>
                        <form onSubmit={(e) => e.preventDefault()} className="max-w-2xl mx-auto mt-8">
                            <div className="relative">
                               <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full py-4 px-6 text-lg text-black bg-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-teal-400 transition"
                                    placeholder="Search for an activity or destination..."
                                />
                                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-rose-500 text-white font-bold py-3 px-8 rounded-full hover:bg-rose-600 transition-transform transform hover:scale-105">
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

             <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold mb-6 text-center">Browse by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {ACTIVITY_CATEGORIES.map(cat => (
                        <button key={cat.name} onClick={() => setFilters(f => ({...f, categories: [cat.name]}))} className="relative rounded-lg overflow-hidden h-24 text-white font-bold text-lg shadow-lg group">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300" />
                            <div className={`absolute inset-0 ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity`}></div>
                            <span className="absolute inset-0 flex items-center justify-center drop-shadow-md">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </section>
            
            <main className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-4 gap-8">
                    <FilterSidebar />
                    
                    <div className="lg:col-span-3">
                         <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold">Tours & Activities ({filteredAndSortedActivities.length})</h2>
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border border-gray-300 rounded-md p-2 focus:ring-teal-500 bg-white">
                                <option>Popularity</option>
                                <option>Rating</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                         </div>
                         {filteredAndSortedActivities.length > 0 ? (
                             <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {filteredAndSortedActivities.slice(0, visibleCount).map(act => (
                                        <ActivityCard key={act.id} activity={act} onSelect={onSelectActivity} />
                                    ))}
                                </div>
                                {visibleCount < filteredAndSortedActivities.length && (
                                    <div className="text-center mt-12">
                                        <button onClick={loadMore} className="px-8 py-3 bg-teal-500 text-white font-bold rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                                            Load More
                                        </button>
                                    </div>
                                )}
                             </>
                         ) : (
                            <div className="text-center py-20 bg-white rounded-xl shadow-md">
                                <h3 className="text-2xl font-semibold text-gray-700">No Activities Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ToursPage;
