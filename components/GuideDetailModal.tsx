
import React, { useState } from 'react';
import { Guide } from '../types';
import Modal from './Modal';
import { TOUR_TYPE_STYLES } from '../constants';

interface GuideDetailModalProps {
  guide: Guide | null;
  isOpen: boolean;
  onClose: () => void;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => <svg key={`full-${i}`} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
        {halfStar && <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
        {[...Array(emptyStars)].map((_, i) => <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
      </div>
    );
};

const Calendar: React.FC = () => (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">August 2024</h4>
        <div className="flex space-x-2">
            <button>&lt;</button>
            <button>&gt;</button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-gray-500">
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      <div className="grid grid-cols-7 text-center mt-2">
        {[...Array(4)].map((_,i) => <div key={i} className="text-gray-300 py-1">2{i+8}</div>)}
        {[...Array(31)].map((_, i) => {
            const day = i + 1;
            const isAvailable = day > 10 && day < 25 && day % 3 !== 0;
            return <div key={i} className={`py-1 rounded-full ${isAvailable ? 'bg-teal-200 text-teal-900 cursor-pointer' : 'text-gray-400'}`}>{day}</div>
        })}
      </div>
      <p className="text-xs text-center mt-2 text-gray-500">This is a demo calendar.</p>
    </div>
);

const GuideDetailModal: React.FC<GuideDetailModalProps> = ({ guide, isOpen, onClose }) => {
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    const handleBooking = () => {
        setBookingConfirmed(true);
        setTimeout(() => {
            onClose();
            setBookingConfirmed(false);
        }, 2000);
    }

    if (!guide) return null;
    
    const tourStyle = TOUR_TYPE_STYLES[guide.tourType];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-lg mx-auto bg-white rounded-2xl">
                {bookingConfirmed ? (
                    <div className="p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-2xl font-bold mt-4">Booking Confirmed!</h3>
                        <p className="text-gray-600 mt-2">You're all set with {guide.name}. Check your email for details.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                <img src={guide.image} alt={guide.name} className="w-32 h-32 rounded-full border-4 border-teal-200 shadow-md" />
                                <div className="text-center sm:text-left">
                                    <h3 className="text-3xl font-bold text-gray-800">{guide.name}</h3>
                                    <p className="text-gray-500">{guide.location}</p>
                                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                                        <StarRating rating={guide.rating} />
                                        <span className="text-sm font-bold text-gray-600">{guide.rating.toFixed(1)}</span>
                                    </div>
                                    <div className={`mt-2 inline-flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${tourStyle.color}`}>
                                        {tourStyle.icon}
                                        <span>{guide.tourType} Specialist</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 border-t pt-6">
                                <p className="text-gray-700">{guide.bio}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <strong className="font-medium text-sm text-gray-600 self-center">Languages:</strong>
                                    {guide.languages.map(lang => (
                                        <span key={lang} className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50">
                             <h4 className="text-lg font-semibold mb-4 text-center">Availability</h4>
                             <Calendar />
                        </div>
                        <div className="p-6 border-t">
                            <button onClick={handleBooking} className="w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-700 transition-all duration-300">
                                Confirm Booking with {guide.name}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default GuideDetailModal;
