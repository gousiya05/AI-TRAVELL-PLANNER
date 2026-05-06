
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FaqItem: React.FC<{ question: string; answer: string, startOpen?: boolean }> = ({ question, answer, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex justify-between items-center py-5 px-1 text-lg font-semibold text-gray-800 hover:text-teal-600 transition-colors"
                aria-expanded={isOpen}
            >
                <span>{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" /></svg>
                </span>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pb-5 px-1 text-gray-600">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const SectionWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <section
            ref={ref as React.RefObject<HTMLElement>}
            className={`py-12 md:py-20 animate-on-scroll ${isVisible ? 'is-visible' : ''} ${className}`}
        >
            <div className="container mx-auto px-6">
                {children}
            </div>
        </section>
    );
};


const VisaPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [formData, setFormData] = useState({
        destination: '',
        nationality: '',
        visaType: '',
        name: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you, ${formData.name}! Your visa quote request for ${formData.destination} has been submitted. We will contact you at ${formData.email}.`);
        setFormData({ destination: '', nationality: '', visaType: '', name: '', email: '' });
    };

    const faqs = [
        { q: "What documents are typically required?", a: "Commonly, you'll need a valid passport, application form, recent photographs, flight and hotel bookings, and proof of financial means. Requirements vary by country." },
        { q: "How long does the visa process take?", a: "Processing times range from a few days to several weeks, depending on the embassy's workload and the visa type. We recommend applying well in advance." },
        { q: "What are the fees involved?", a: "Fees include the embassy fee, our service fee, and any applicable taxes. We provide a transparent breakdown of all costs before you proceed." },
        { q: "Can I track my application status?", a: "Yes! Once you apply through us, you'll receive a tracking ID to monitor the progress of your application on our portal." },
    ];

    const whyChooseUs = [
        { title: "Expert Guidance", desc: "Our team navigates complex visa rules for you.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.375 3.375 0 0014 18.442V21.003a5.971 5.971 0 00-4.006.001v-2.561a3.375 3.375 0 00-1.31-2.65l-.548-.547z" /></svg> },
        { title: "Fast Processing", desc: "We streamline your application to avoid unnecessary delays.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { title: "High Success Rate", desc: "Our meticulous approach maximizes your approval chances.", icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    ];

    return (
        <div className="bg-gray-50 pt-20">
            <div className="container mx-auto px-6 pt-8">
                <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                </button>
            </div>

            <SectionWrapper className="!pt-8 !pb-0">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-teal-600">Visa Application Services</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Your hassle-free gateway to the world. We handle the paperwork, so you can focus on your journey.</p>
                </div>
            </SectionWrapper>
            
            <SectionWrapper>
                 <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-center">Get a Visa Quote</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Traveling To</label>
                                <select id="destination" name="destination" value={formData.destination} onChange={handleInputChange} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                                    <option value="" disabled>Select a Country</option>
                                    <option>USA</option><option>Canada</option><option>United Kingdom</option><option>Schengen Area</option><option>Australia</option><option>UAE</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Your Nationality</label>
                                <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} required placeholder="e.g., Indian" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                            </div>
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="you@example.com" className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                            </div>
                            <button type="submit" className="w-full mt-4 py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-transform transform hover:scale-105">
                                Start Application
                            </button>
                        </form>
                    </div>
                     <div className="space-y-8">
                        <h3 className="text-2xl font-bold">Why Choose Us?</h3>
                        {whyChooseUs.map(item => (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-teal-100 text-teal-600 p-4 rounded-full">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold">{item.title}</h4>
                                    <p className="text-gray-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </SectionWrapper>
            
            <SectionWrapper className="bg-white">
                 <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                 <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => <FaqItem key={index} question={faq.q} answer={faq.a} startOpen={index === 0} />)}
                 </div>
            </SectionWrapper>

        </div>
    );
};

export default VisaPage;
