
import React, { useState, useEffect } from 'react';
import { Bus, Seat as SeatType } from '../types';
import Modal from './Modal';
import Seat from './Seat';

interface SeatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  bus: Bus | null;
}

const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({ isOpen, onClose, bus }) => {
    const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
    const [passengers, setPassengers] = useState<any[]>([]);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (bus) {
            setSelectedSeats([]);
            setPassengers([]);
            setIsConfirmed(false);
        }
    }, [bus]);

    useEffect(() => {
        if (selectedSeats.length !== passengers.length) {
            setPassengers(selectedSeats.map(seat => ({
                seatId: seat.id,
                name: '',
                age: '',
                gender: 'Male'
            })));
        }
    }, [selectedSeats]);

    if (!bus) return null;

    const handleSeatClick = (seat: SeatType) => {
        setSelectedSeats(prev => {
            if (prev.find(s => s.id === seat.id)) {
                return prev.filter(s => s.id !== seat.id);
            } else {
                return [...prev, seat];
            }
        });
    };
    
    const handlePassengerChange = (index: number, field: string, value: string) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [field]: value };
        setPassengers(newPassengers);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsConfirmed(true);
        setTimeout(onClose, 3000);
    };

    const totalFare = selectedSeats.length * bus.price;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                 <div className="p-4 bg-purple-800 text-white">
                    <h2 className="text-xl font-bold">Select Your Seats</h2>
                    <p className="text-sm">{bus.operatorName} - {bus.busType}</p>
                </div>
                
                 {isConfirmed ? (
                    <div className="p-8 text-center transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <h3 className="text-2xl font-bold mt-4">Booking Successful!</h3>
                        <p className="text-gray-600 mt-2">Your tickets for seat(s) {selectedSeats.map(s => s.number).join(', ')} have been booked.</p>
                        <p className="font-bold text-xl mt-4">Total Fare Paid: ₹{totalFare.toLocaleString()}</p>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row">
                            {/* Seat Layout */}
                            <div className="w-full md:w-1/2 p-4 bg-gray-50 border-r">
                                <div className="p-4 border-2 border-dashed rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-semibold">Seat Layout</h4>
                                        <div className="flex items-center gap-1 text-sm"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg> Driver</div>
                                    </div>
                                    <div className="space-y-2">
                                        {bus.seatLayout.map((row, rowIndex) => (
                                            <div key={rowIndex} className="flex justify-around">
                                                {row.map((seat, seatIndex) => (
                                                     <Seat 
                                                        key={seat ? seat.id : `${rowIndex}-${seatIndex}`} 
                                                        seat={seat} 
                                                        isSelected={!!selectedSeats.find(s => s.id === seat?.id)} 
                                                        onSelect={handleSeatClick} 
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs">
                                    <div className="flex items-center gap-1"><div className="w-4 h-4 border rounded bg-white"></div> Available</div>
                                    <div className="flex items-center gap-1"><div className="w-4 h-4 border rounded bg-gray-400"></div> Booked</div>
                                    <div className="flex items-center gap-1"><div className="w-4 h-4 border rounded bg-pink-300"></div> Female</div>
                                    <div className="flex items-center gap-1"><div className="w-4 h-4 border rounded bg-teal-400"></div> Selected</div>
                                </div>
                            </div>
                            
                            {/* Booking Details */}
                            <div className="w-full md:w-1/2 p-4 max-h-[60vh] overflow-y-auto">
                                {selectedSeats.length > 0 ? (
                                    <>
                                        <h4 className="font-semibold mb-2">Passenger Details for Seat(s): {selectedSeats.map(s => s.number).join(', ')}</h4>
                                        <div className="space-y-3">
                                            {passengers.map((p, index) => (
                                                <div key={p.seatId} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 bg-gray-50 rounded-lg">
                                                    <input type="text" placeholder={`Name (Seat ${selectedSeats[index].number})`} value={p.name} onChange={e => handlePassengerChange(index, 'name', e.target.value)} required className="md:col-span-2 p-1.5 border rounded-md text-sm" />
                                                    <div className="flex gap-2">
                                                      <input type="number" placeholder="Age" value={p.age} onChange={e => handlePassengerChange(index, 'age', e.target.value)} required min="1" max="120" className="p-1.5 border rounded-md w-full text-sm" />
                                                      <select value={p.gender} onChange={e => handlePassengerChange(index, 'gender', e.target.value)} className="p-1.5 border rounded-md bg-white w-full text-sm">
                                                          <option>Male</option><option>Female</option>
                                                      </select>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        Please select your seat(s) from the layout.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 bg-gray-100 border-t flex justify-between items-center">
                            <div>
                                <p className="text-lg font-bold">Total Fare:</p>
                                <p className="text-2xl font-extrabold text-teal-700">₹{totalFare.toLocaleString()}</p>
                            </div>
                            <button type="submit" disabled={selectedSeats.length === 0} className="px-8 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                                Confirm & Book
                            </button>
                        </div>
                    </form>
                 )}
            </div>
        </Modal>
    );
};

export default SeatSelectionModal;
