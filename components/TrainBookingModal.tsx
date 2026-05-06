
import React, { useState, useEffect } from 'react';
import { Train, TrainClassInfo } from '../types';
import Modal from './Modal';
import { TRAIN_STATIONS } from '../constants';

const stationMap = new Map(TRAIN_STATIONS.map(s => [s.code, s]));

interface TrainBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: { train: Train; classInfo: TrainClassInfo } | null;
}

const TrainBookingModal: React.FC<TrainBookingModalProps> = ({ isOpen, onClose, bookingDetails }) => {
    const [passengers, setPassengers] = useState([{ name: '', age: '', gender: 'Male' }]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        // Reset state when modal opens or details change
        if (isOpen) {
            setPassengers([{ name: '', age: '', gender: 'Male' }]);
            setIsConfirmed(false);
        }
    }, [isOpen, bookingDetails]);

    if (!bookingDetails) return null;

    const { train, classInfo } = bookingDetails;
    const fromStation = stationMap.get(train.fromStationCode);
    const toStation = stationMap.get(train.toStationCode);
    const totalFare = classInfo.fare * passengers.length;

    const handlePassengerChange = (index: number, field: string, value: string) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [field]: value };
        setPassengers(newPassengers);
    };

    const addPassenger = () => {
        setPassengers([...passengers, { name: '', age: '', gender: 'Male' }]);
    };

    const removePassenger = (index: number) => {
        setPassengers(passengers.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmed(true);
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 bg-blue-800 text-white">
                    <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
                    <p>{train.name} ({train.number})</p>
                    <p className="text-sm">{fromStation?.name} to {toStation?.name}</p>
                </div>

                {isConfirmed ? (
                    <div className="p-8 text-center transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-2xl font-bold mt-4">Booking Successful!</h3>
                        <p className="text-gray-600 mt-2">Your tickets have been booked. You will receive a confirmation email shortly.</p>
                        <p className="font-bold text-xl mt-4">Total Fare: ₹{totalFare.toLocaleString()}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 max-h-[60vh] overflow-y-auto">
                            <h3 className="text-lg font-semibold mb-4">Passenger Details</h3>
                            <div className="space-y-4">
                                {passengers.map((p, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg relative">
                                        <input type="text" placeholder="Full Name" value={p.name} onChange={e => handlePassengerChange(index, 'name', e.target.value)} required className="md:col-span-2 p-2 border rounded-md" />
                                        <input type="number" placeholder="Age" value={p.age} onChange={e => handlePassengerChange(index, 'age', e.target.value)} required min="1" max="120" className="p-2 border rounded-md" />
                                        <select value={p.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} className="p-2 border rounded-md bg-white">
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                        {passengers.length > 1 && (
                                            <button type="button" onClick={() => removePassenger(index)} className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={addPassenger} className="mt-4 text-sm font-semibold text-teal-600 hover:text-teal-800">
                                + Add another passenger
                            </button>
                        </div>
                        <div className="p-6 bg-gray-100 border-t flex justify-between items-center">
                            <div>
                                <p className="text-lg font-bold">Total Fare:</p>
                                <p className="text-2xl font-extrabold text-teal-700">₹{totalFare.toLocaleString()}</p>
                            </div>
                            <button type="submit" className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105">
                                Proceed to Pay
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default TrainBookingModal;
