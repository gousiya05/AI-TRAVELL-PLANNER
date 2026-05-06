
import React from 'react';
import { Train, TrainClassInfo, TrainClassType, TrainAvailabilityStatus } from '../types';
import { TRAIN_STATIONS } from '../constants';

const stationMap = new Map(TRAIN_STATIONS.map(s => [s.code, s]));

const classMap: Record<TrainClassType, string> = {
    '1A': 'AC First Class',
    '2A': 'AC 2-Tier',
    '3A': 'AC 3-Tier',
    'SL': 'Sleeper',
    'CC': 'AC Chair Car',
    'EC': 'Exec. Chair Car',
    '2S': 'Second Seating',
};

const availabilityStyles: Record<TrainAvailabilityStatus, string> = {
    'AVAILABLE': 'text-green-600 bg-green-100',
    'RAC': 'text-orange-600 bg-orange-100',
    'WAITLISTED': 'text-red-600 bg-red-100',
    'NOT AVAILABLE': 'text-gray-500 bg-gray-200',
};

const TrainCard: React.FC<{ train: Train; onBookNow: (train: Train, classInfo: TrainClassInfo) => void; }> = ({ train, onBookNow }) => {
    const fromStation = stationMap.get(train.fromStationCode);
    const toStation = stationMap.get(train.toStationCode);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Main Info Header */}
            <div className="p-4 bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-blue-800">{train.name} ({train.number})</h3>
                        <p className="text-sm text-gray-500">
                            Runs on: <span className="font-medium">{train.daysOfOperation.join(', ')}</span>
                        </p>
                    </div>
                    <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">{train.type}</div>
                </div>
                <div className="mt-4 flex justify-between items-center text-center">
                    <div>
                        <p className="text-xl font-semibold">{train.departureTime}</p>
                        <p className="text-sm font-medium text-gray-600">{fromStation?.code}</p>
                        <p className="text-xs text-gray-500 truncate">{fromStation?.name}</p>
                    </div>
                    <div className="flex-grow text-center px-2">
                        <p className="text-sm font-semibold text-gray-700">{train.duration}</p>
                        <div className="w-full h-1 bg-gray-200 rounded-full relative my-1">
                            <div className="absolute left-0 top-1/2 w-2 h-2 bg-gray-500 rounded-full -translate-y-1/2"></div>
                            <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-500 rounded-full -translate-y-1/2"></div>
                        </div>
                    </div>
                    <div>
                        <p className="text-xl font-semibold">{train.arrivalTime}</p>
                        <p className="text-sm font-medium text-gray-600">{toStation?.code}</p>
                        <p className="text-xs text-gray-500 truncate">{toStation?.name}</p>
                    </div>
                </div>
            </div>
            
            {/* Classes Availability */}
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {train.classes.map(classInfo => (
                        <button
                            key={classInfo.classType}
                            onClick={() => onBookNow(train, classInfo)}
                            disabled={classInfo.availability === 'NOT AVAILABLE'}
                            className="p-3 border rounded-lg text-left transition-all hover:shadow-md hover:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-gray-800">{classMap[classInfo.classType]} ({classInfo.classType})</p>
                                <p className="text-lg font-bold text-teal-700">₹{classInfo.fare.toLocaleString()}</p>
                            </div>
                            <div className={`mt-2 text-xs font-bold inline-block px-2 py-0.5 rounded ${availabilityStyles[classInfo.availability]}`}>
                                {classInfo.availability === 'AVAILABLE' && `AVL ${classInfo.availableCount}`}
                                {classInfo.availability === 'RAC' && `RAC ${classInfo.availableCount}`}
                                {classInfo.availability === 'WAITLISTED' && `WL ${classInfo.availableCount}`}
                                {classInfo.availability === 'NOT AVAILABLE' && 'NOT AVAILABLE'}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrainCard;
