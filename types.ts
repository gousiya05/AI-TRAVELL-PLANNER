import React from 'react';

export interface Destination {
  name: string;
  state: string;
  shortDescription: string;
  image: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export type TourType = 'Beach' | 'Trekking' | 'Spiritual' | 'Heritage' | 'Nature' | 'Adventure';

export interface Guide {
  id: number;
  name: string;
  location: string;
  languages: string[];
  experience: number;
  tourType: TourType;
  rating: number;
  image: string;
  bio: string;
}

export interface AIGeneratedDetails {
  description: string;
  highlights: string[];
  travelTips: string[];
  weatherInfo: string;
  threeDayItinerary: {
    day: number;
    title: string;
    activities: string;
  }[];
  localFoods: string[];
  culturalFacts: string[];
}

export interface TourTypeStyles {
  icon: React.JSX.Element;
  color: string;
}

export type VehicleType = 'Cab' | 'Auto' | 'Bike';

export interface TransportVendor {
  id: number;
  name: string;
  location: string;
  vehicleType: VehicleType;
  model: string;
  price: string;
  image: string;
}

export type HotelAmenity = 'Pool' | 'WiFi' | 'Parking' | 'Restaurant' | 'Gym' | 'Pet Friendly' | 'Spa';

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  amenities: HotelAmenity[];
  image: string;
  description: string;
}

export type HomestayType = 'Villa' | 'Apartment' | 'Farm Stay' | 'Bungalow' | 'Houseboat' | 'Cottage';
export type HomestayAmenity = 'Pool' | 'Kitchen' | 'WiFi' | 'Parking' | 'Pet Friendly' | 'Air Conditioning';

export interface Homestay {
  id: number;
  name: string;
  type: HomestayType;
  location: string;
  pricePerNight: number;
  rating: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  amenities: HomestayAmenity[];
  image: string;
  description: string;
}

export type PackageTheme = 'Romantic' | 'Adventure' | 'Family' | 'Cultural' | 'Beach' | 'Hill Station' | 'Wildlife';
export type PackageInclusion = 'Flights' | 'Hotels' | 'Tours' | 'Meals' | 'Transfers' | 'Permits';
export type AccommodationType = 'Luxury' | 'Mid-range' | 'Budget';

export interface HolidayPackage {
  id: number;
  title: string;
  destinations: string[];
  duration: {
    days: number;
    nights: number;
  };
  price: number;
  image: string;
  theme: PackageTheme;
  inclusions: PackageInclusion[];
  rating: number;
  shortDescription: string;
  accommodationType: AccommodationType;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  gallery: string[];
}

// Train Types
export interface TrainStation {
  code: string;
  name: string;
  city: string;
}

export type TrainClassType = '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC' | '2S';
export type TrainAvailabilityStatus = 'AVAILABLE' | 'RAC' | 'WAITLISTED' | 'NOT AVAILABLE';
export type TrainType = 'Superfast' | 'Express' | 'Rajdhani' | 'Shatabdi' | 'Duronto';


export interface TrainClassInfo {
  classType: TrainClassType;
  fare: number;
  availability: TrainAvailabilityStatus;
  availableCount: number;
}

export interface Train {
  id: number;
  name: string;
  number: string;
  fromStationCode: string;
  toStationCode: string;
  departureTime: string; // "HH:mm"
  arrivalTime: string; // "HH:mm"
  duration: string; // "Xh Ym"
  daysOfOperation: string[]; // e.g., ['Mon', 'Wed', 'Fri']
  classes: TrainClassInfo[];
  type: TrainType;
}

// Bus Types
export interface BusStop {
    id: number;
    name: string;
    city: string;
}

export type BusAmenity = 'WiFi' | 'Water Bottle' | 'Blanket' | 'Charging Point' | 'Live Tracking';
export type BusType = 'AC Sleeper' | 'Non-AC Seater' | 'AC Seater' | 'Volvo Multi-Axle' | 'Semi-Sleeper';

export interface Seat {
  id: string; // e.g., 'L1', 'U5', 'S10'
  number: string; // e.g., '1', '5', '10'
  isSleeper: boolean;
  isAvailable: boolean;
  isFemaleSeat?: boolean;
  berth?: 'lower' | 'upper';
}

export interface Bus {
  id: number;
  operatorName: string;
  busType: BusType;
  fromCity: string;
  toCity: string;
  boardingPoints: { time: string; point: string }[];
  droppingPoints: { time: string; point: string }[];
  departureTime: string; // "HH:mm"
  arrivalTime: string; // "HH:mm"
  duration: string; // "Xh Ym"
  availableSeats: number;
  price: number;
  rating: number;
  amenities: BusAmenity[];
  seatLayout: (Seat | null)[][]; // 2D array representing layout, with null for aisles
}

// Cab Types
export type CabServiceType = 'Local' | 'Outstation' | 'Airport';
export type CarCategory = 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Tempo Traveller';

export interface CabFareDetails {
    baseFare: number;
    driverAllowance?: number;
    tolls?: number;
    stateTax?: number;
    gst: number;
    inclusions: string[];
    exclusions: string[];
}

export interface Cab {
    id: number;
    serviceType: CabServiceType;
    carCategory: CarCategory;
    carModel: string;
    capacity: number;
    luggage: number;
    price: number;
    fareDetails: CabFareDetails;
    image: string;
    rating: number;
    // For filtering
    city?: string;
    fromCity?: string;
    toCity?: string;
    airport?: string;
    localPackage?: string; // e.g., '4hr-40km'
    outstationTripType?: 'one-way' | 'round-trip';
    airportTripType?: 'pickup' | 'drop';
}

// Tours & Attractions Types
export type ActivityCategory = 'Cultural' | 'Adventure' | 'Food' | 'Sightseeing' | 'Nature & Wildlife' | 'Workshop';
export type ActivityInclusion = 'Guide' | 'Meals' | 'Transfers' | 'Entry Tickets';

export interface Activity {
  id: number;
  title: string;
  location: string;
  category: ActivityCategory;
  image: string;
  gallery: string[];
  shortDescription: string;
  longDescription: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  inclusions: ActivityInclusion[];
  whatToKnow: string[];
  itinerary?: {
    time: string;
    description: string;
  }[];
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}
