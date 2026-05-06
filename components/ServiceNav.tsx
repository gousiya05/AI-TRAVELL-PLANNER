
import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { View } from '../App';

type ServiceName = 'Flights' | 'Hotels' | 'Homestays & Villas' | 'Holiday Packages' | 'Trains' | 'Buses' | 'Cabs' | 'Tours & Attractions' | 'Visa' | 'Cruise' | 'Forex Card & Currency' | 'Travel Insurance';

interface ServiceNavItem {
    name: ServiceName;
    icon: React.JSX.Element;
    actionType: 'view' | 'alert';
    actionPayload: View | string;
}

const serviceItems: ServiceNavItem[] = [
    { name: 'Flights', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>, actionType: 'view', actionPayload: 'flights' },
    { name: 'Hotels', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5v-4.5m0 3.75a2.25 2.25 0 01-4.5 0" /></svg>, actionType: 'view', actionPayload: 'hotels' },
    { name: 'Homestays & Villas', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>, actionType: 'view', actionPayload: 'homestays' },
    { name: 'Holiday Packages', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>, actionType: 'view', actionPayload: 'packages' },
    { name: 'Trains', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21v-4m10 4v-4M5.625 17.25h12.75M5.625 17.25a2.25 2.25 0 01-2.25-2.25V7.5a2.25 2.25 0 012.25-2.25h12.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25M12 13.5v-4.5m-3.75 4.5v-4.5m7.5 4.5v-4.5" /></svg>, actionType: 'view', actionPayload: 'trains' },
    { name: 'Buses', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5c.966 0 1.842-.258 2.5-.72M12 19.5c-.966 0-1.842-.258-2.5-.72M12 19.5v-4.5M17.25 12c0-2.072-1.678-3.75-3.75-3.75H10.5c-2.072 0-3.75 1.678-3.75 3.75v3c0 2.072 1.678 3.75 3.75 3.75h3c2.072 0 3.75-1.678 3.75-3.75v-3zM8.25 8.25h7.5" /></svg>, actionType: 'view', actionPayload: 'buses' },
    { name: 'Cabs', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.375a2.25 2.25 0 00-2.25 2.25v8.25a2.25 2.25 0 002.25 2.25z" /></svg>, actionType: 'view', actionPayload: 'cabs' },
    { name: 'Tours & Attractions', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10h6" /></svg>, actionType: 'view', actionPayload: 'tours' },
    { name: 'Visa', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, actionType: 'view', actionPayload: 'visa' },
    { name: 'Cruise', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5v2.25m-3-2.25v2.25m-3-2.25V9A2.25 2.25 0 019.75 6.75h4.5A2.25 2.25 0 0116.5 9v4.5m-9 0h9" /></svg>, actionType: 'alert', actionPayload: 'Cruise feature is coming soon!' },
    { name: 'Forex Card & Currency', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.75A.75.75 0 013 4.5h.75m0 0H21m-21 6h21m-21 6h21m0 0h1.5a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5H21m-18 9a1.5 1.5 0 00-1.5-1.5v-6a1.5 1.5 0 001.5-1.5H21a1.5 1.5 0 001.5 1.5v6a1.5 1.5 0 00-1.5 1.5H3.75z" /></svg>, actionType: 'alert', actionPayload: 'Forex Card & Currency feature is coming soon!' },
    { name: 'Travel Insurance', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>, actionType: 'alert', actionPayload: 'Travel Insurance feature is coming soon!' },
];

interface ServiceNavProps {
    onViewChange: (view: View) => void;
}

const ServiceNav: React.FC<ServiceNavProps> = ({ onViewChange }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [activeService, setActiveService] = useState<ServiceName>('Flights');

    const handleClick = (item: ServiceNavItem) => {
        setActiveService(item.name);
        if (item.actionType === 'view') {
            onViewChange(item.actionPayload as View);
        } else {
            alert(item.actionPayload);
        }
    };
    
    return (
        <section 
            ref={ref as React.RefObject<HTMLElement>}
            className={`py-8 bg-gray-50 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
        >
            <div className="container mx-auto px-6">
                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:overflow-visible md:p-0 md:m-0">
                    {serviceItems.map((item) => {
                        const isActive = activeService === item.name;
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleClick(item)}
                                className="flex-shrink-0 flex flex-col items-center gap-2 w-24 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 rounded-lg p-2"
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <div className={`flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md ${isActive ? 'bg-teal-100' : 'bg-gray-200'}`}>
                                    <div className={`transition-colors duration-300 ${isActive ? 'text-teal-600' : 'text-gray-600'}`}>
                                      {item.icon}
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-teal-600' : 'text-gray-700'}`}>
                                    {item.name}
                                </span>
                                <div className={`h-1 w-10 rounded-full transition-colors duration-300 mt-1 ${isActive ? 'bg-teal-500' : 'bg-transparent'}`}></div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServiceNav;