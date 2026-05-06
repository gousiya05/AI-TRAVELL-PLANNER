
import React, { useState, useEffect } from 'react';
import { Cab } from '../types';
import Modal from './Modal';

interface CabBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  cabDetails: Cab | null;
}

const CabBookingModal: React.FC<CabBookingModalProps> = ({ isOpen, onClose, cabDetails }) => {
    const [passenger, setPassenger] = useState({ name: '', contact: '' });
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setPassenger({ name: '', contact: '' });
            setIsConfirmed(false);
        }
    }, [isOpen]);

    if (!cabDetails) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassenger(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmed(true);
        setTimeout(onClose, 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-indigo-700 text-white">
                    <h2 className="text-2xl font-bold">Confirm Your Ride</h2>
                    <p className="opacity-90">Please provide passenger details to complete the booking.</p>
                </div>

                {isConfirmed ? (
                    <div className="p-8 text-center transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-2xl font-bold mt-4">Booking Successful!</h3>
                        <p className="text-gray-600 mt-2">Your cab is booked. The driver will contact {passenger.name} shortly.</p>
                        <p className="font-bold text-xl mt-4">Total Fare: ₹{cabDetails.price.toLocaleString()}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border">
                                <h4 className="font-semibold">{cabDetails.carModel} <span className="text-gray-500">({cabDetails.carCategory})</span></h4>
                                <p className="text-sm text-gray-600">
                                    {cabDetails.serviceType === 'Outstation' && `${cabDetails.fromCity} → ${cabDetails.toCity}`}
                                    {cabDetails.serviceType === 'Local' && `${cabDetails.city} - ${cabDetails.localPackage}`}
                                    {cabDetails.serviceType === 'Airport' && `${cabDetails.airport} ↔ ${cabDetails.city}`}
                                </p>
                            </div>
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" value={passenger.name} onChange={handleChange} required placeholder="Enter passenger name" className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input type="tel" id="contact" name="contact" value={passenger.contact} onChange={handleChange} required placeholder="Enter 10-digit mobile number" className="mt-1 w-full p-2 border rounded-md" />
                            </div>
                        </div>
                        <div className="p-6 bg-gray-100 border-t flex justify-between items-center">
                            <div>
                                <p className="text-lg font-bold">Total Payable:</p>
                                <p className="text-2xl font-extrabold text-teal-700">₹{cabDetails.price.toLocaleString()}</p>
                            </div>
                            <button type="submit" className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105">
                                Confirm & Pay
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default CabBookingModal;
