
import React, { useState, useMemo } from 'react';
import { CABS_DATA, CITIES_DATA, AIRPORTS_DATA } from '../constants';
import { Cab, CabServiceType, CarCategory } from '../types';
import CabCard from './CabCard';
import CabBookingModal from './CabBookingModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const getTodayString = () => new Date().toISOString().split('T')[0];

const CabsPage: React.FC<{ onBack: () => void; }> = ({ onBack }) => {
    const { ref, isVisible } = useScrollAnimation();
    
    const [serviceType, setServiceType] = useState<CabServiceType>('Outstation');
    const [searchCriteria, setSearchCriteria] = useState<any>({
        date: getTodayString(),
        time: '09:00',
        tripType: 'one-way'
    });
    const [searchResults, setSearchResults] = useState<Cab[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    
    const [filters, setFilters] = useState({
        carCategory: [] as CarCategory[],
        price: 15000,
    });
    const [sortBy, setSortBy] = useState('Price: Low to High');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCab, setSelectedCab] = useState<Cab | null>(null);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const criteria = Object.fromEntries(formData.entries());
        
        const results = CABS_DATA.filter(cab => {
            if (cab.serviceType !== serviceType) return false;
            
            switch(serviceType) {
                case 'Local':
                    return cab.city === criteria.city && cab.localPackage === criteria.package;
                case 'Outstation':
                    return cab.fromCity === criteria.from && cab.toCity === criteria.to && cab.outstationTripType === criteria.tripType;
                case 'Airport':
                     return cab.airport === criteria.airport && cab.city === criteria.city && cab.airportTripType === criteria.transferType;
                default:
                    return false;
            }
        });
        
        setSearchResults(results);
        setHasSearched(true);
    };
    
     const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        if (name === 'carCategory') {
            const list = filters.carCategory;
            const updatedList = checked 
                ? [...list, value as CarCategory]
                : list.filter(item => item !== value);
            setFilters(prev => ({ ...prev, carCategory: updatedList }));
        } else {
            setFilters(prev => ({ ...prev, [name]: type === 'range' ? Number(value) : value }));
        }
    };

    const filteredAndSortedCabs = useMemo(() => {
        let cabs = [...searchResults];

        // Apply filters
        cabs = cabs.filter(cab => {
            const categoryFilterMatch = filters.carCategory.length === 0 || filters.carCategory.includes(cab.carCategory);
            const priceFilterMatch = cab.price <= filters.price;
            return categoryFilterMatch && priceFilterMatch;
        });

        // Apply sorting
        switch(sortBy) {
            case 'Rating':
                cabs.sort((a, b) => b.rating - a.rating);
                break;
            case 'Price: Low to High':
            default:
                 cabs.sort((a, b) => a.price - b.price);
                break;
        }
        return cabs;
    }, [searchResults, filters, sortBy]);
    
    const handleBookNow = (cab: Cab) => {
        setSelectedCab(cab);
        setIsModalOpen(true);
    };

    const renderSearchWidget = () => {
        switch(serviceType) {
            case 'Local':
                return (
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <DataListInput label="Pickup City" name="city" listId="city-list" options={CITIES_DATA} required />
                        <SelectInput label="Package" name="package" required>
                           <option value="4hr-40km">4 Hrs / 40 Kms</option>
                           <option value="8hr-80km">8 Hrs / 80 Kms</option>
                           <option value="12hr-120km">12 Hrs / 120 Kms</option>
                        </SelectInput>
                        <DateInput name="date" />
                        <TimeInput name="time" />
                    </div>
                );
            case 'Airport':
                 return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-4 mb-2">
                             <RadioGroup name="transferType" options={[{label: 'Airport Pickup', value: 'pickup'}, {label: 'Airport Drop', value: 'drop'}]} />
                        </div>
                        <DataListInput label="Airport" name="airport" listId="airport-list" options={AIRPORTS_DATA.map(a => a.name)} required />
                        <DataListInput label="City" name="city" listId="city-list" options={CITIES_DATA} required />
                        <DateInput name="date" />
                        <TimeInput name="time" />
                    </div>
                );
            case 'Outstation':
            default:
                 return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-4 mb-2">
                            <RadioGroup name="tripType" options={[{label: 'One Way', value: 'one-way'}, {label: 'Round Trip', value: 'round-trip'}]} />
                        </div>
                        <DataListInput label="From" name="from" listId="city-list" options={CITIES_DATA} required />
                        <DataListInput label="To" name="to" listId="city-list" options={CITIES_DATA} required />
                        <DateInput name="date" />
                        <TimeInput name="time" />
                    </div>
                );
        }
    };
    
    // Helper components for forms
    const DateInput: React.FC<{name: string}> = ({ name }) => (
        <div><label className="block text-sm font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</label><input type="date" name={name} defaultValue={getTodayString()} min={getTodayString()} required className="mt-1 w-full p-2.5 rounded-md text-gray-900"/></div>
    );
    const TimeInput: React.FC<{name: string}> = ({ name }) => (
        <div><label className="block text-sm font-medium">{name.charAt(0).toUpperCase() + name.slice(1)}</label><input type="time" name={name} defaultValue="09:00" required className="mt-1 w-full p-2.5 rounded-md text-gray-900"/></div>
    );
    const SelectInput: React.FC<any> = ({ label, name, children, ...props }) => (
        <div><label className="block text-sm font-medium">{label}</label><select name={name} {...props} className="mt-1 w-full p-2.5 rounded-md text-gray-900 bg-white">{children}</select></div>
    );
    const DataListInput: React.FC<{label: string, name: string, listId: string, options: string[], required?: boolean}> = ({label, name, listId, options, ...props}) => (
        <div><label className="block text-sm font-medium">{label}</label><input type="text" list={listId} name={name} {...props} className="mt-1 w-full p-2.5 rounded-md text-gray-900"/><datalist id={listId}>{options.map(o => <option key={o} value={o}/>)}</datalist></div>
    );
    const RadioGroup: React.FC<{name: string, options: {label: string, value: string}[]}> = ({name, options}) => {
        const [selectedValue, setSelectedValue] = useState(options[0].value);
        return (<div className="flex bg-indigo-900/50 rounded-lg p-1">{options.map(opt => <label key={opt.value} className={`w-1/2 text-center py-2 rounded-md font-semibold cursor-pointer transition ${selectedValue === opt.value ? 'bg-white text-indigo-700' : ''}`}><input type="radio" name={name} value={opt.value} checked={selectedValue === opt.value} onChange={(e) => setSelectedValue(e.target.value)} className="sr-only"/>{opt.label}</label>)}</div>);
    };

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
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1533126449704-358739ced49e?w=1200&q=80)'}}
            >
                <div className="bg-indigo-900/60 py-12">
                    <div className="container mx-auto px-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-center">Reliable Cab Services</h1>
                        <p className="mt-2 text-lg text-indigo-100 text-center">Book your ride, your way. Local, Outstation, or Airport.</p>
                        
                        <div className="mt-8 max-w-4xl mx-auto bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                            <div className="flex justify-center border-b border-white/20 mb-4">
                                {(['Outstation', 'Local', 'Airport'] as CabServiceType[]).map(type => (
                                    <button key={type} onClick={() => setServiceType(type)} className={`px-6 py-2.5 text-lg font-semibold transition-colors duration-300 border-b-4 ${serviceType === type ? 'border-rose-400 text-white' : 'border-transparent text-indigo-200 hover:text-white'}`}>
                                        {type}
                                    </button>
                                ))}
                            </div>
                            <form onSubmit={handleSearchSubmit}>
                                {renderSearchWidget()}
                                <button type="submit" className="w-full mt-4 bg-rose-500 text-white font-bold py-3 rounded-md hover:bg-rose-600 transition-colors text-lg">
                                    Find Cabs
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            
            {hasSearched && (
                 <main className="container mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-4 gap-8">
                        <aside className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg h-fit lg:sticky top-28">
                            <h3 className="text-xl font-bold mb-4">Filter By</h3>
                            <div className="space-y-6">
                                <div><h4 className="font-semibold mb-2">Car Type</h4><div className="space-y-1">{(['Hatchback', 'Sedan', 'SUV', 'Luxury'] as CarCategory[]).map(cat => (<label key={cat} className="flex items-center space-x-2 text-sm"><input type="checkbox" name="carCategory" value={cat} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" /><span>{cat}</span></label>))}</div></div>
                                <div><label className="font-semibold">Max Price</label><input type="range" name="price" min="1000" max="15000" step="500" defaultValue={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-500" /><div className="text-center font-medium text-teal-600 mt-2">Up to ₹{filters.price.toLocaleString()}</div></div>
                            </div>
                        </aside>

                        <div className="lg:col-span-3">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Available Cabs ({filteredAndSortedCabs.length})</h2>
                                <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border border-gray-300 rounded-md p-2 bg-white">
                                    <option>Price: Low to High</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                            {filteredAndSortedCabs.length > 0 ? (
                                <div className="space-y-6">
                                    {filteredAndSortedCabs.map(cab => (
                                        <CabCard key={cab.id} cab={cab} onBookNow={handleBookNow} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl shadow-md"><h3 className="text-2xl font-semibold text-gray-700">No Cabs Found</h3><p className="text-gray-500 mt-2">No cabs match your search. Please try different criteria.</p></div>
                            )}
                        </div>
                    </div>
                </main>
            )}

            <CabBookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} cabDetails={selectedCab} />
        </div>
    );
};

export default CabsPage;
