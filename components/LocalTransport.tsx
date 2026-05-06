import React, { useState, useMemo } from 'react';
import { LOCAL_TRANSPORT_VENDORS, VEHICLE_TYPE_STYLES } from '../constants';
import { TransportVendor, VehicleType } from '../types';
import TransportVendorCard from './TransportVendorCard';
import Modal from './Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface LocalTransportProps {
  destination: string;
}

const LocalTransport: React.FC<LocalTransportProps> = ({ destination }) => {
    const { ref, isVisible } = useScrollAnimation();
    const [activeTab, setActiveTab] = useState<VehicleType>('Cab');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<TransportVendor | null>(null);

    const availableVendors = useMemo(() => {
        return LOCAL_TRANSPORT_VENDORS.filter(
            vendor => vendor.location === destination && vendor.vehicleType === activeTab
        );
    }, [destination, activeTab]);

    const handleBookNow = (vendor: TransportVendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };
    
    const tabs: VehicleType[] = ['Cab', 'Auto', 'Bike'];

    return (
        <>
            <section
                id="local-transport-section"
                ref={ref as React.RefObject<HTMLElement>}
                className={`container mx-auto px-6 py-16 mt-8 bg-white rounded-2xl shadow-lg animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        Book Your <span className="text-teal-600">Local Ride</span>
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">Find the best way to get around {destination}.</p>
                </div>
                
                <div className="flex justify-center border-b-2 border-gray-200 mb-8">
                    {tabs.map(tab => {
                         const style = VEHICLE_TYPE_STYLES[tab];
                         if (!style) return null; // Ensure style exists
                         return (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold transition-colors duration-300 border-b-4 ${
                                    activeTab === tab 
                                    ? 'border-teal-500 text-teal-600' 
                                    : 'border-transparent text-gray-500 hover:text-teal-500'
                                }`}
                            >
                                {style.icon}
                                {tab}
                            </button>
                         )
                    })}
                </div>
                
                {availableVendors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {availableVendors.map(vendor => (
                            <TransportVendorCard key={vendor.id} vendor={vendor} onBook={handleBookNow} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg">
                        <h4 className="text-2xl font-semibold text-gray-700">No {activeTab}s Available</h4>
                        <p className="text-gray-500 mt-2">Sorry, we couldn't find any {activeTab.toLowerCase()} services for {destination} at the moment.</p>
                    </div>
                )}
            </section>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                 {selectedVendor && (
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-center">Confirm Your Booking</h3>
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                           <p>You are booking a <strong>{selectedVendor.model}</strong> from</p>
                           <p className="text-xl font-semibold text-teal-600 my-1">{selectedVendor.name}</p>
                           <p>in <strong>{selectedVendor.location}</strong>.</p>
                           <p className="mt-2 text-lg font-bold">Price: {selectedVendor.price}</p>
                        </div>
                        <button 
                            onClick={() => {
                                alert(`Booking confirmed for ${selectedVendor.model} with ${selectedVendor.name}! (Demo)`);
                                setIsModalOpen(false);
                            }} 
                            className="mt-6 w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-700 transition">
                            Confirm
                        </button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default LocalTransport;
