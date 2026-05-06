
import React from 'react';
import { Seat as SeatType } from '../types';

interface SeatProps {
  seat: SeatType | null;
  isSelected: boolean;
  onSelect: (seat: SeatType) => void;
}

const Seat: React.FC<SeatProps> = ({ seat, isSelected, onSelect }) => {
    if (!seat) {
        return <div className="w-8 h-8 md:w-10 md:h-10"></div>; // Aisle space
    }

    const { isAvailable, isSleeper, isFemaleSeat } = seat;
    
    let seatClasses = "w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md border-2 cursor-pointer transition-all duration-200 ";
    let icon = null;

    if (isSleeper) {
        seatClasses += "h-12 md:h-16 ";
        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7.5 3A4.5 4.5 0 003 7.5v6.252a1.75 1.75 0 001.75 1.75h8.5A1.75 1.75 0 0015 13.752V7.5A4.5 4.5 0 007.5 3zm-2.5 7A.5.5 0 015.5 9.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" /></svg>;
    } else {
        icon = <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 5a3 3 0 013-3h4a3 3 0 013 3v1h1a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h1V5zm4 0h2v1H9V5z" clipRule="evenodd" /></svg>;
    }
    
    if (isSelected) {
        seatClasses += "bg-teal-400 border-teal-600 text-white transform scale-110 shadow-lg";
    } else if (!isAvailable) {
        seatClasses += "bg-gray-400 border-gray-500 text-white cursor-not-allowed";
    } else if (isFemaleSeat) {
        seatClasses += "bg-pink-200 border-pink-400 hover:bg-pink-300";
    } else {
        seatClasses += "bg-white border-gray-300 hover:bg-gray-200 hover:border-gray-400";
    }

    return (
        <button
            type="button"
            className={seatClasses}
            disabled={!isAvailable}
            onClick={() => isAvailable && onSelect(seat)}
            aria-label={`Seat ${seat.number}, ${isAvailable ? 'Available' : 'Booked'}`}
        >
            {icon}
        </button>
    );
};

export default Seat;
