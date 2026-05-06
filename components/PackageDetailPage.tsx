
import React, { useState } from 'react';
import { HolidayPackage } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ItineraryItem: React.FC<{ day: number; title: string; description: string; startOpen?: boolean }> = ({ day, title, description, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left"
            >
                <span className="text-lg font-semibold text-teal-700">Day {day}: {title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </span>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <p className="pb-4 text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

const SectionWrapper: React.FC<{ children: React.ReactNode, title: string, className?: string }> = ({ children, title, className = '' }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            className={`py-12 animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
            {children}
        </section>
    );
};


const PackageDetailPage: React.FC<{ pkg: HolidayPackage; onBack: () => void; }> = ({ pkg, onBack }) => {
    const [mainImage, setMainImage] = useState(pkg.gallery[0]);
    
    return (
        <div className="bg-gray-50 pt-20 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                 <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Packages
                </button>
                
                <header className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                           <h1 className="text-4xl font-extrabold text-teal-600">{pkg.title}</h1>
                           <p className="text-lg text-gray-600 mt-1">{pkg.destinations.join(' • ')}</p>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="text-4xl font-bold text-rose-500">₹{pkg.price.toLocaleString()}</p>
                             <p className="text-sm text-gray-500">per person</p>
                        </div>
                    </div>
                </header>

                <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <div className="bg-white p-4 rounded-2xl shadow-lg">
                            <img src={mainImage} alt="Main view" className="w-full h-96 object-cover rounded-xl mb-4"/>
                            <div className="grid grid-cols-4 gap-2">
                                {pkg.gallery.map(img => (
                                    <button key={img} onClick={() => setMainImage(img)}>
                                        <img src={img} alt="Thumbnail" className={`w-full h-24 object-cover rounded-lg cursor-pointer border-4 ${mainImage === img ? 'border-teal-500' : 'border-transparent hover:border-teal-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <SectionWrapper title="Day-by-Day Itinerary" className="!py-0">
                                {pkg.itinerary.map((item, index) => (
                                    <ItineraryItem key={item.day} {...item} startOpen={index===0} />
                                ))}
                            </SectionWrapper>
                        </div>

                    </div>

                    <aside className="lg:col-span-1 space-y-8 lg:sticky top-28 h-fit">
                        {/* Booking & Info Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Package Details</h3>
                             <div className="space-y-3 text-gray-700">
                                <p><strong>Duration:</strong> {pkg.duration.days} Days, {pkg.duration.nights} Nights</p>
                                <p><strong>Theme:</strong> {pkg.theme}</p>
                                <p><strong>Accommodation:</strong> {pkg.accommodationType}</p>
                                <p><strong>Rating:</strong> {pkg.rating} / 5.0</p>
                            </div>
                            <button className="w-full mt-6 py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105">
                                Book Now (Demo)
                            </button>
                            <button className="w-full mt-3 py-2.5 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                                Send Inquiry
                            </button>
                        </div>

                        {/* Inclusions Card */}
                         <div className="bg-white p-6 rounded-2xl shadow-lg">
                             <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                             <ul className="space-y-2">
                                {pkg.inclusions.map(inc => (
                                    <li key={inc} className="flex items-center gap-3">
                                        <span className="text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        </span>
                                        <span>{inc}</span>
                                    </li>
                                ))}
                             </ul>
                             <h3 className="text-2xl font-bold my-4 pt-4 border-t">Exclusions</h3>
                             <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <span className="text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                    </span>
                                    <span>Visa Fees & Travel Insurance</span>
                                </li>
                                <li className="flex items-center gap-3">
                                     <span className="text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                    </span>
                                    <span>Personal expenses, tips, and gratuities</span>
                                </li>
                             </ul>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default PackageDetailPage;
