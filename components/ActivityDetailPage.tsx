
import React, { useState } from 'react';
import { Activity } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const DetailPageSection: React.FC<{ children: React.ReactNode, title: string, className?: string }> = ({ children, title, className = '' }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            className={`py-6 animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b-2 border-gray-200 pb-2">{title}</h2>
            {children}
        </section>
    );
};


const ActivityDetailPage: React.FC<{ activity: Activity; onBack: () => void; }> = ({ activity, onBack }) => {
    const [mainImage, setMainImage] = useState(activity.gallery[0] || activity.image);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const totalTravelers = adults + children;
    const totalFare = activity.price * adults + (activity.price / 2) * children;

    return (
        <div className="bg-gray-50 pt-20 min-h-screen">
            <div className="container mx-auto px-6 py-8">
                 <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Back to Activities
                </button>
                
                <header className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                           <span className="text-sm font-semibold text-rose-500 uppercase">{activity.category}</span>
                           <h1 className="text-4xl font-extrabold text-teal-600">{activity.title}</h1>
                           <p className="text-lg text-gray-600 mt-1">{activity.location}</p>
                        </div>
                    </div>
                </header>

                <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-4 rounded-2xl shadow-lg">
                            <img src={mainImage} alt="Main view" className="w-full h-96 object-cover rounded-xl mb-4"/>
                            <div className="grid grid-cols-5 gap-2">
                                {activity.gallery.map(img => (
                                    <button key={img} onClick={() => setMainImage(img)}>
                                        <img src={img} alt="Thumbnail" className={`w-full h-24 object-cover rounded-lg cursor-pointer border-4 ${mainImage === img ? 'border-teal-500' : 'border-transparent hover:border-teal-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <DetailPageSection title="About this activity">
                                <p className="text-gray-700 leading-relaxed">{activity.longDescription}</p>
                            </DetailPageSection>

                            {activity.itinerary && (
                                <DetailPageSection title="Itinerary">
                                    <div className="space-y-4">
                                        {activity.itinerary.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="font-bold text-teal-600 w-20 flex-shrink-0">{item.time}</div>
                                                <div className="text-gray-600">{item.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </DetailPageSection>
                            )}

                            <div className="grid md:grid-cols-2 gap-8">
                                <DetailPageSection title="Inclusions">
                                    <ul className="space-y-2">
                                        {activity.inclusions.map(inc => (
                                            <li key={inc} className="flex items-center gap-3"><span className="text-green-500"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg></span>{inc}</li>
                                        ))}
                                    </ul>
                                </DetailPageSection>
                                 <DetailPageSection title="Good to Know">
                                    <ul className="space-y-2 list-disc list-inside text-gray-600">
                                        {activity.whatToKnow.map(note => <li key={note}>{note}</li>)}
                                    </ul>
                                </DetailPageSection>
                            </div>
                        </div>
                    </div>

                    <aside className="lg:col-span-1 space-y-8 lg:sticky top-28 h-fit">
                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Book Your Spot</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="font-semibold">Date</label>
                                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full mt-1 p-2 border rounded-md" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="font-semibold">Adults</label>
                                        <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Children</label>
                                        <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} className="w-full mt-1 p-2 border rounded-md" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold">Total ({totalTravelers} travelers)</span>
                                    <span className="text-2xl font-bold text-rose-500">₹{totalFare.toLocaleString()}</span>
                                </div>
                            </div>
                            <button className="w-full mt-4 py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105">
                                Book Now (Demo)
                            </button>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default ActivityDetailPage;
