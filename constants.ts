
import React from 'react';
import { Destination, Guide, TourTypeStyles, TourType, TransportVendor, VehicleType, Hotel, HotelAmenity, Homestay, HomestayType, HolidayPackage, Train, TrainStation, Bus, BusStop, Cab, Activity, ActivityCategory } from './types';

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')    // Remove all non-word chars
    .replace(/--+/g, '-')        // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};


export const INDIA_DESTINATIONS: Destination[] = [
  {
    name: 'Goa',
    state: 'Goa',
    shortDescription: 'Golden beaches, vibrant nightlife, and Portuguese heritage.',
    image: 'https://plus.unsplash.com/premium_photo-1697729594707-0fc9e51c8eed?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z29hJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    theme: { primary: 'bg-amber-500', secondary: 'bg-amber-100', accent: 'text-amber-600' },
  },
  {
    name: 'Kerala',
    state: 'Kerala',
    shortDescription: 'Serene backwaters, lush tea plantations, and rich culture.',
    image: 'https://plus.unsplash.com/premium_photo-1694475205503-d6c6a71f03bc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D',
    theme: { primary: 'bg-green-600', secondary: 'bg-green-100', accent: 'text-green-700' },
  },
  {
    name: 'Ladakh',
    state: 'Ladakh',
    shortDescription: 'High-altitude desert with stunning monasteries and views.',
    image: 'https://media.istockphoto.com/id/1061972184/photo/landscape-of-snow-mountains-and-mountain-road-to-nubra-valley-in-leh-ladakh-india.jpg?s=612x612&w=0&k=20&c=i0pA6oVMEzUgBLp5V7CblN1wPwOO7A2D3orhfi7HGe4=',
    theme: { primary: 'bg-sky-600', secondary: 'bg-sky-100', accent: 'text-sky-700' },
  },
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    shortDescription: 'The "Pink City," with majestic palaces and historic forts.',
    image: 'https://images.unsplash.com/photo-1578999935853-4ec5fa6c1f60?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGphaXB1ciUyMHBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D',
    theme: { primary: 'bg-pink-500', secondary: 'bg-pink-100', accent: 'text-pink-600' },
  },
  {
    name: 'Chennai',
    state: 'Tamil Nadu',
    shortDescription: 'Gateway to the South, with temples and beaches.',
    image: 'https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/1765681589chennai-1696645169332.jpg',
    theme: { primary: 'bg-orange-600', secondary: 'bg-orange-100', accent: 'text-orange-700' },
  },
  {
    name: 'Andaman Islands',
    state: 'Andaman & Nicobar',
    shortDescription: 'Pristine beaches, coral reefs, and crystal-clear waters.',
    image: 'https://images.unsplash.com/photo-1682687981630-cefe9cd73072?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8N3x8ZGl2aW5nfGVufDB8fDB8fHww',
    theme: { primary: 'bg-cyan-500', secondary: 'bg-cyan-100', accent: 'text-cyan-600' },
  },
  {
    name: 'Rishikesh',
    state: 'Uttarakhand',
    shortDescription: 'Yoga capital along the holy Ganges river in the Himalayas.',
    image: 'https://images.unsplash.com/photo-1614605670899-47ecba60bf2a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlzaGlrZXNoJTJDJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    theme: { primary: 'bg-orange-500', secondary: 'bg-orange-100', accent: 'text-orange-600' },
  },
  {
    name: 'Manali',
    state: 'Himachal Pradesh',
    shortDescription: 'Himalayan resort town offering adventure and scenery.',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3VsbHUlMjBtYW5hbGl8ZW58MHx8MHx8fDA%3D',
    theme: { primary: 'bg-blue-500', secondary: 'bg-blue-100', accent: 'text-blue-600' },
  },
  {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    shortDescription: 'Spiritual heart of India, with ancient ghats and ceremonies.',
    image: 'https://images.unsplash.com/photo-1706186839147-0d708602587b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFyYW5hc2klMjBnaGF0fGVufDB8fDB8fHww',
    theme: { primary: 'bg-amber-700', secondary: 'bg-amber-100', accent: 'text-amber-800' },
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    shortDescription: 'The romantic "City of Lakes" with stunning palaces and water views.',
    image: 'https://plus.unsplash.com/premium_photo-1661963369594-9b25cd53be4d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2l0eSUyMHBhbGFjZSUyMHVkYWlwdXJ8ZW58MHx8MHx8fDA%3D',
    theme: { primary: 'bg-indigo-500', secondary: 'bg-indigo-100', accent: 'text-indigo-600' },
  },
  {
    name: 'Hampi',
    state: 'Karnataka',
    shortDescription: 'Ancient ruins of the Vijayanagara Empire set in a surreal landscape.',
    image: 'https://images.unsplash.com/photo-1596018382916-56d2e341d784?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhbXBpfGVufDB8fDB8fHww',
    theme: { primary: 'bg-stone-600', secondary: 'bg-stone-200', accent: 'text-stone-700' },
  },
];

export const HOLIDAY_PACKAGES: HolidayPackage[] = [
  {
    id: 1,
    title: 'Golden Triangle Discovery',
    destinations: ['Delhi', 'Agra', 'Jaipur'],
    duration: { days: 7, nights: 6 },
    price: 45000,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D',
    theme: 'Cultural',
    inclusions: ['Hotels', 'Tours', 'Transfers', 'Meals'],
    rating: 4.7,
    accommodationType: 'Mid-range',
    shortDescription: 'Explore the iconic trio of Delhi, Agra, and Jaipur in this classic Indian tour, witnessing wonders like the Taj Mahal.',
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Arrive in Delhi, transfer to your pre-booked hotel. Spend the evening at leisure, perhaps exploring Connaught Place.' },
      { day: 2, title: 'Delhi Sightseeing', description: 'Embark on a full-day tour of Old and New Delhi. Visit Jama Masjid, Red Fort, Raj Ghat, India Gate, and Qutub Minar.' },
      { day: 3, title: 'Journey to Agra', description: 'Drive to Agra, home of the Taj Mahal. Check into your hotel and later visit Agra Fort, a UNESCO World Heritage site.' },
      { day: 4, title: 'Sunrise at Taj Mahal & Drive to Jaipur', description: 'Witness the breathtaking beauty of the Taj Mahal at sunrise. Later, drive to Jaipur, visiting Fatehpur Sikri en route.' },
      { day: 5, title: 'Jaipur, The Pink City', description: 'Explore Jaipur with a visit to the majestic Amber Fort. Enjoy an elephant ride. Later, see the City Palace, Hawa Mahal, and Jantar Mantar.' },
      { day: 6, title: 'Return to Delhi', description: 'Enjoy a final Rajasthani breakfast before driving back to Delhi. The evening is free for last-minute shopping.' },
      { day: 7, title: 'Departure', description: 'After breakfast, transfer to the airport for your onward journey, filled with memories of India.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500',
      'https://images.unsplash.com/photo-1541410965328-3a72383450e0?w=500',
      'https://images.unsplash.com/photo-1599691458253-6a2a0a2a72a2?w=500',
      'https://images.unsplash.com/photo-1557099496-883a45305011?w=500'
    ]
  },
  {
    id: 2,
    title: 'Kerala Backwaters & Hills',
    destinations: ['Munnar', 'Thekkady', 'Alleppey'],
    duration: { days: 6, nights: 5 },
    price: 38000,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D',
    theme: 'Beach',
    inclusions: ['Hotels', 'Transfers', 'Meals'],
    rating: 4.9,
    accommodationType: 'Mid-range',
    shortDescription: 'Experience the serene backwaters on a houseboat and explore the lush green tea plantations of Munnar.',
    itinerary: [
      { day: 1, title: 'Arrival in Cochin & Drive to Munnar', description: 'Arrive at Cochin Airport, meet our representative and drive to Munnar. Enjoy the scenic journey through waterfalls and tea gardens.' },
      { day: 2, title: 'Munnar Sightseeing', description: 'Visit Eravikulam National Park to see the Nilgiri Tahr, Mattupetty Dam, Tea Museum, and Echo Point.' },
      { day: 3, title: 'Munnar to Thekkady', description: 'Proceed to Thekkady (Periyar), known for its spice plantations. Enjoy a spice plantation tour in the afternoon.' },
      { day: 4, title: 'Thekkady Wildlife & Alleppey Houseboat', description: 'Morning boat ride on Periyar Lake to spot wildlife. Later, drive to Alleppey to board your private houseboat.' },
      { day: 5, title: 'Alleppey Backwaters', description: 'Cruise through the enchanting backwaters of Alleppey. Enjoy delicious Keralan cuisine prepared on board. Overnight stay on the houseboat.' },
      { day: 6, title: 'Departure from Cochin', description: 'After breakfast, disembark from the houseboat and transfer to Cochin Airport for your flight back home.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500',
      'https://images.unsplash.com/photo-1524309326036-9b5104863f69?w=500'
    ]
  },
  {
    id: 3,
    title: 'Adventurous Ladakh Expedition',
    destinations: ['Leh', 'Nubra Valley', 'Pangong Lake'],
    duration: { days: 8, nights: 7 },
    price: 55000,
    image: 'https://imgcld.yatra.com/ytimages/image/upload/v1517482103/AdvNation/ANN_TRP530/Bike-Expedition-Ladakh_1439472639_F6YkoV.jpg',
    theme: 'Adventure',
    inclusions: ['Hotels', 'Transfers', 'Meals', 'Permits'],
    rating: 4.8,
    accommodationType: 'Mid-range',
    shortDescription: 'A thrilling journey to the "Land of High Passes" with stunning landscapes, monasteries, and high-altitude lakes.',
    itinerary: [
      { day: 1, title: 'Arrival in Leh', description: 'Fly into Leh. Acclimatize to the high altitude. Rest day.' },
      { day: 2, title: 'Leh Local Sightseeing', description: 'Visit Shanti Stupa, Leh Palace, and explore Leh market.' },
      { day: 3, title: 'Leh to Nubra Valley via Khardung La', description: 'Drive over the world\'s highest motorable pass, Khardung La, to reach the beautiful Nubra Valley. Enjoy a camel ride on the sand dunes.' },
      { day: 4, title: 'Nubra Valley to Pangong Lake', description: 'Visit Diskit Monastery and then drive to the mesmerizing Pangong Tso, a high-altitude saltwater lake.' },
      { day: 5, title: 'Pangong Lake to Leh', description: 'Enjoy the sunrise over Pangong Lake and drive back to Leh via Chang La pass.' },
      { day: 6, title: 'Monastery Tour', description: 'Visit the famous monasteries of Hemis, Thiksey, and Shey Palace.' },
      { day: 7, title: 'River Rafting in Zanskar', description: 'Experience thrilling white water rafting on the Zanskar River.' },
      { day: 8, title: 'Departure from Leh', description: 'Transfer to Leh airport for your flight home.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1605649487212-47bdab06245d?w=500',
      'https://images.unsplash.com/photo-1547822851-7bdfa596b421?w=500',
      'https://images.unsplash.com/photo-1588100122602-0c93a073f622?w=500'
    ]
  },
  {
    id: 4,
    title: 'Romantic Andaman Escape',
    destinations: ['Port Blair', 'Havelock Island', 'Neil Island'],
    duration: { days: 6, nights: 5 },
    price: 62000,
    image: 'https://www.andamantourism.org/wp-content/uploads/2018/10/honeymoon-packages.jpg',
    theme: 'Romantic',
    inclusions: ['Flights', 'Hotels', 'Transfers', 'Tours', 'Meals'],
    rating: 4.9,
    accommodationType: 'Luxury',
    shortDescription: 'Discover pristine beaches, turquoise waters, and vibrant coral reefs in this idyllic romantic getaway.',
    itinerary: [
       { day: 1, title: 'Arrival in Port Blair', description: 'Arrive in Port Blair, check into your hotel. Later, visit the historic Cellular Jail and enjoy the Light and Sound Show.' },
       { day: 2, title: 'Journey to Havelock Island', description: 'Take a high-speed catamaran to Havelock Island. Visit the world-famous Radhanagar Beach and enjoy a spectacular sunset.' },
       { day: 3, title: 'Havelock - Elephant Beach', description: 'Excursion to Elephant Beach for snorkeling and other water sports, witnessing the vibrant coral reefs.' },
       { day: 4, title: 'Havelock to Neil Island', description: 'Travel to the tranquil Neil Island. Visit Laxmanpur Beach, Bharatpur Beach, and the Natural Bridge formation.' },
       { day: 5, title: 'Return to Port Blair', description: 'Sail back to Port Blair. Spend the day shopping for souvenirs and local handicrafts.' },
       { day: 6, title: 'Departure', description: 'Transfer to the airport for your return flight.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1599233483984-24a0d1558e2a?w=500',
      'https://images.unsplash.com/photo-1602052284344-7a4b08702314?w=500',
      'https://images.unsplash.com/photo-1620138546344-7b2c343e06e3?w=500'
    ]
  },
  {
    id: 5,
    title: 'Manali Family Fun',
    destinations: ['Manali', 'Solang Valley', 'Kullu'],
    duration: { days: 5, nights: 4 },
    price: 28000,
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a3VsbHUlMjBtYW5hbGl8ZW58MHx8MHx8fDA%3D',
    theme: 'Family',
    inclusions: ['Hotels', 'Transfers', 'Meals', 'Tours'],
    rating: 4.6,
    accommodationType: 'Mid-range',
    shortDescription: 'A perfect family holiday in the Himalayas with adventure activities, scenic beauty, and cultural experiences.',
    itinerary: [
      { day: 1, title: 'Arrival in Manali', description: 'Arrive in Manali and check into your hotel. Rest and admire the stunning mountain views.' },
      { day: 2, title: 'Manali Local Sightseeing', description: 'Visit Hadimba Temple, Manu Temple, Vashisht Hot Springs, and the Tibetan Monastery.' },
      { day: 3, title: 'Solang Valley Adventure', description: 'Full-day excursion to Solang Valley. Enjoy activities like paragliding, zorbing, and skiing (seasonal).' },
      { day: 4, title: 'Kullu & Manikaran Excursion', description: 'Drive to Kullu for river rafting. Later, visit the holy hot springs at Manikaran Gurudwara.' },
      { day: 5, title: 'Departure', description: 'After breakfast, depart from Manali with wonderful family memories.' }
    ],
    gallery: [
       'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=500',
       'https://images.unsplash.com/photo-1626621341517-bbf375941b23?w=500',
       'https://images.unsplash.com/photo-1613819876248-b472a83020b7?w=500'
    ]
  },
   {
    id: 6,
    title: 'Royal Rajasthan Heritage Tour',
    destinations: ['Jaipur', 'Jodhpur', 'Udaipur'],
    duration: { days: 9, nights: 8 },
    price: 75000,
    image: 'https://extranet.transindiaholidays.com/images/package/images/Small/TransIndia-The-Lalit-Laxmi-Vilas-Palace-20191304_111358.jpg',
    theme: 'Cultural',
    inclusions: ['Hotels', 'Tours', 'Transfers', 'Meals'],
    rating: 4.8,
    accommodationType: 'Luxury',
    shortDescription: 'Immerse yourself in the opulence and grandeur of Rajasthan\'s palaces, forts, and lakes.',
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Arrive in the Pink City, Jaipur. Check in and relax.' },
      { day: 2, title: 'Jaipur Sightseeing', description: 'Explore Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar.' },
      { day: 3, title: 'Jaipur to Jodhpur', description: 'Drive to the Blue City, Jodhpur. In the evening, explore the local market.' },
      { day: 4, title: 'Jodhpur Sightseeing', description: 'Visit the magnificent Mehrangarh Fort, Jaswant Thada, and Umaid Bhawan Palace Museum.' },
      { day: 5, title: 'Jodhpur to Udaipur', description: 'Drive to the City of Lakes, Udaipur, visiting the Ranakpur Jain Temples en route.' },
      { day: 6, title: 'Udaipur City Tour', description: 'Discover the City Palace, Jagdish Temple, and Saheliyon-ki-Bari.' },
      { day: 7, title: 'Udaipur Lake Pichola', description: 'Enjoy a serene boat ride on Lake Pichola, visiting Jag Mandir Palace.' },
      { day: 8, title: 'Day at Leisure in Udaipur', description: 'Enjoy a day at leisure for shopping or exploring the city on your own.' },
      { day: 9, title: 'Departure from Udaipur', description: 'Transfer to Udaipur airport for your flight home.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1567190581428-1a5a570ab46b?w=500',
      'https://images.unsplash.com/photo-1549995536-176a161b581e?w=500',
      'https://images.unsplash.com/photo-1577189491517-a685e1008e7a?w=500'
    ]
  },
];


export const HOTELS: Hotel[] = [
  { id: 1, name: 'Taj Fort Aguada Resort & Spa', location: 'Goa', rating: 4.8, pricePerNight: 18000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa', 'Gym'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D', description: 'Luxury resort offering panoramic views of the Arabian Sea.' },
  { id: 2, name: 'The Leela Palace', location: 'Jaipur', rating: 4.9, pricePerNight: 22000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa', 'Gym'], image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/46/28/b9/peacock-lounge.jpg?w=900&h=500&s=1', description: 'A modern palace hotel that exemplifies the luxury of Jaipur.' },
  { id: 3, name: 'Kumarakom Lake Resort', location: 'Kerala', rating: 4.7, pricePerNight: 15000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa'], image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D', description: 'Experience the serene backwaters in a traditional Kerala setting.' },
  { id: 4, name: 'The Grand Dragon', location: 'Ladakh', rating: 4.5, pricePerNight: 12000, amenities: ['WiFi', 'Restaurant', 'Parking'], image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWx8ZW58MHx8MHx8fDA%3D', description: 'A blend of modern luxury and traditional Ladakhi hospitality.' },
  { id: 5, name: 'W Goa', location: 'Goa', rating: 4.6, pricePerNight: 25000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Gym', 'Pet Friendly'], image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8fDB8fHww', description: 'Vibrant and eclectic, located on the picturesque Vagator Beach.' },
  { id: 6, name: 'Rambagh Palace', location: 'Jaipur', rating: 5.0, pricePerNight: 45000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa', 'Gym'], image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGhvdGVsfGVufDB8fDB8fHww', description: 'The former residence of the Maharaja of Jaipur, offering an experience of royal living.' },
  { id: 7, name: 'The Manu Allaya Resort Spa', location: 'Manali', rating: 4.4, pricePerNight: 9000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa', 'Parking'], image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fHww', description: 'Nestled in the Himalayas, offering breathtaking views and luxury.' },
  { id: 8, name: 'Aloha on the Ganges', location: 'Rishikesh', rating: 4.6, pricePerNight: 8000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa'], image: 'https://images.unsplash.com/photo-1445019980597-93e0901b8965?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGhvdGVsfGVufDB8fDB8fHww', description: 'A serene resort on the banks of the holy Ganges river.' },
  { id: 9, name: 'The Oberoi Amarvilas', location: 'Agra', rating: 5.0, pricePerNight: 55000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa', 'Gym'], image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGhvdGVsfGVufDB8fDB8fHww', description: 'Located just 600 metres from the Taj Mahal, every room offers a view of the monument.' },
  { id: 10, name: 'BrijRama Palace', location: 'Varanasi', rating: 4.8, pricePerNight: 28000, amenities: ['WiFi', 'Restaurant', 'Spa'], image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdGVsfGVufDB8fDB8fHww', description: 'A heritage hotel on the banks of the Ganges, offering a glimpse into Varanasi\'s spiritual heart.' },
  { id: 11, name: 'Taj Lake Palace', location: 'Udaipur', rating: 5.0, pricePerNight: 60000, amenities: ['Pool', 'WiFi', 'Restaurant', 'Spa'], image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww', description: 'A spectacular hotel appearing to float on the waters of Lake Pichola.' },
];

export const HOMESTAYS: Homestay[] = [
    { id: 1, name: 'Luxury Sea View Villa', type: 'Villa', location: 'Goa', pricePerNight: 25000, rating: 4.9, bedrooms: 4, bathrooms: 5, maxGuests: 10, amenities: ['Pool', 'Kitchen', 'WiFi', 'Air Conditioning'], image: 'https://media.istockphoto.com/id/2110310187/photo/luxury-tropical-pool-villa-at-dusk.jpg?s=612x612&w=0&k=20&c=r8UTpMnbLWD_DOKHAcu6dw-MJEcGg0CTqt0ICa84D84=', description: 'A stunning villa with a private pool overlooking the Arabian Sea.' },
    { id: 2, name: 'The Backwater Abode', type: 'Houseboat', location: 'Kerala', pricePerNight: 12000, rating: 4.8, bedrooms: 2, bathrooms: 2, maxGuests: 4, amenities: ['Kitchen', 'Air Conditioning'], image: 'https://cruiseland.in/wp-content/uploads/2019/03/blog-houseboat.jpg', description: 'Experience the serene Kerala backwaters on a traditional, luxurious houseboat.' },
    { id: 3, name: 'Himalayan Hideaway Cottage', type: 'Cottage', location: 'Manali', pricePerNight: 8000, rating: 4.7, bedrooms: 2, bathrooms: 2, maxGuests: 5, amenities: ['Kitchen', 'WiFi', 'Parking'], image: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/532497183.jpg?k=34151b3ad61e2633f02c53feb981e7cffe846f8ce17c36624b7be0d3f94efce8&o=&hp=1', description: 'A cozy cottage nestled in the mountains, perfect for a peaceful retreat.' },
    { id: 4, name: 'Royal Haveli', type: 'Bungalow', location: 'Jaipur', pricePerNight: 18000, rating: 4.9, bedrooms: 5, bathrooms: 5, maxGuests: 12, amenities: ['Kitchen', 'WiFi', 'Parking', 'Air Conditioning'], image: 'https://q-xx.bstatic.com/xdata/images/hotel/840x460/522069251.jpg?k=6a20877371aaef7b6ba7770b9dce788c1a007bcfab472863757ffd1c95a64859&o=', description: 'Live like royalty in a restored heritage haveli in the heart of the Pink City.' },
    { id: 5, name: 'The City Loft', type: 'Apartment', location: 'Mumbai', pricePerNight: 9500, rating: 4.5, bedrooms: 1, bathrooms: 1, maxGuests: 2, amenities: ['Kitchen', 'WiFi', 'Air Conditioning'], image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/b9/fe/19/deluxe-room-graciously.jpg?w=900&h=500&s=1', description: 'A chic and modern apartment in a bustling Mumbai neighborhood.' },
    { id: 6, name: 'Organic Farm Stay', type: 'Farm Stay', location: 'Goa', pricePerNight: 7000, rating: 4.8, bedrooms: 3, bathrooms: 3, maxGuests: 6, amenities: ['Kitchen', 'Parking', 'Pet Friendly'], image: 'https://api.avathi.com/images/2_1741864421.webp', description: 'Reconnect with nature at this beautiful organic farm, complete with fresh produce.' },
    { id: 7, name: 'Lakeside Palace View', type: 'Apartment', location: 'Udaipur', pricePerNight: 15000, rating: 4.9, bedrooms: 2, bathrooms: 2, maxGuests: 4, amenities: ['Kitchen', 'WiFi', 'Air Conditioning'], image: 'https://api.blessingsonthenet.com/uploads/hotels/3141fb46591343994ffef7632ea30f56-1689999125752-Sterling-Lake-Palace-Alleppey_1.jpg', description: 'Wake up to stunning views of Lake Pichola from this luxurious apartment.' },
    { id: 8, name: 'Jungle Paradise Villa', type: 'Villa', location: 'Kerala', pricePerNight: 22000, rating: 4.7, bedrooms: 3, bathrooms: 4, maxGuests: 8, amenities: ['Pool', 'Kitchen', 'WiFi', 'Parking'], image: 'https://a0.muscache.com/im/pictures/miso/Hosting-49590943/original/a375a71c-e77c-46ff-ab2b-f30418ae8452.jpeg?im_w=720', description: 'A secluded villa nestled in the lush greenery of the Western Ghats.' },
    { id: 9, name: 'Anjuna Beach-Side Cottage', type: 'Cottage', location: 'Goa', pricePerNight: 11000, rating: 4.6, bedrooms: 1, bathrooms: 1, maxGuests: 3, amenities: ['WiFi', 'Air Conditioning', 'Kitchen'], image: 'https://q-xx.bstatic.com/xdata/images/hotel/max500/172430028.jpg?k=244b915cba29450b47857af71052e30af54d401e97690b000dcfef9c7db632ff&o=', description: 'A charming cottage just steps away from the famous Anjuna Beach.' },
];

export const TOUR_GUIDES: Guide[] = [
  // Goa
  { id: 1, name: 'Rohan Sharma', location: 'Goa', languages: ['English', 'Hindi', 'Konkani'], experience: 8, tourType: 'Beach', rating: 4.8, image: 'https://media.istockphoto.com/id/1267208177/photo/canacona-goa-india-young-caucasian-lady-woman-with-camera-standing-on-famous-palolem-beach.jpg?s=2048x2048&w=is&k=20&c=ZivZ9y3sam5ODbe-_n4piVkAwU4X6fJ82k_PvNbafWg=', bio: 'A true Goan at heart, Rohan has been sharing the magic of its beaches and hidden gems for nearly a decade.' },
  { id: 2, name: 'Priya Fernandes', location: 'Goa', languages: ['English', 'Portuguese'], experience: 10, tourType: 'Heritage', rating: 4.9, image: 'https://plus.unsplash.com/premium_photo-1661315450957-551378d1cce4?q=80&w=1449&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', bio: 'Priya is a history enthusiast who brings the rich Portuguese-Indian heritage of Old Goa to life with captivating stories.' },
  { id: 3, name: 'Sandeep Naik', location: 'Goa', languages: ['English', 'Hindi'], experience: 5, tourType: 'Nature', rating: 4.6, image: 'https://images.pexels.com/photos/6036161/pexels-photo-6036161.jpeg', bio: 'Explore the lush spice plantations and wildlife sanctuaries of Goa with Sandeep, a passionate naturalist.' },
  
  // Kerala
  { id: 4, name: 'Anjali Menon', location: 'Kerala', languages: ['English', 'Malayalam'], experience: 12, tourType: 'Nature', rating: 4.9, image: 'https://images.unsplash.com/photo-1606278986576-d12efcba4c4e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', bio: 'Anjali offers serene backwater tours and treks through Munnar\'s tea gardens, showcasing the best of "God\'s Own Country."' },
  { id: 5, name: 'David Joseph', location: 'Kerala', languages: ['English', 'Hindi', 'Tamil'], experience: 7, tourType: 'Heritage', rating: 4.7, image: 'https://images.pexels.com/photos/31278667/pexels-photo-31278667.jpeg', bio: 'Discover the colonial history of Fort Kochi and the ancient trade routes with David, a master storyteller.' },
  { id: 6, name: 'Lakshmi Pillai', location: 'Kerala', languages: ['English', 'Malayalam'], experience: 9, tourType: 'Spiritual', rating: 4.8, image: 'https://images.pexels.com/photos/9983087/pexels-photo-9983087.jpeg', bio: 'Lakshmi provides wellness and spiritual journeys, including visits to tranquil ashrams and Ayurvedic centers.' },
  
  // Ladakh
  { id: 7, name: 'Tenzin Norbu', location: 'Ladakh', languages: ['English', 'Ladakhi', 'Hindi'], experience: 15, tourType: 'Trekking', rating: 5.0, image: 'https://images.pexels.com/photos/31011982/pexels-photo-31011982.jpeg', bio: 'A seasoned mountaineer, Tenzin leads challenging treks to Ladakh\'s highest peaks and most remote monasteries.' },
  { id: 8, name: 'Stanzin Angmo', location: 'Ladakh', languages: ['English', 'Ladakhi'], experience: 8, tourType: 'Adventure', rating: 4.8, image: 'https://images.pexels.com/photos/20365104/pexels-photo-20365104.jpeg', bio: 'From motorbike tours on Khardung La to rafting in the Zanskar River, Stanzin is your go-to for adventure.' },
  { id: 9, name: 'Rigzin Wangyal', location: 'Ladakh', languages: ['English', 'Hindi'], experience: 10, tourType: 'Spiritual', rating: 4.9, image: 'https://images.pexels.com/photos/16926009/pexels-photo-16926009.jpeg', bio: 'Rigzin offers immersive cultural tours, focusing on the ancient Buddhist monasteries and traditions of Ladakh.' },
  
  // Jaipur
  { id: 10, name: 'Vikram Singh', location: 'Jaipur', languages: ['English', 'Hindi', 'Rajasthani'], experience: 20, tourType: 'Heritage', rating: 4.9, image: 'https://media.istockphoto.com/id/809108584/photo/rajastani-senior-man-in-jaipur-india.jpg?s=612x612&w=0&k=20&c=rortz6i_KFms3WRyC_N6-Btk5wz2z743Os8szup26Aw=', bio: 'A descendant of a noble family, Vikram provides unparalleled insights into the royal history of Jaipur\'s forts and palaces.' },
  { id: 11, name: 'Meera Rathore', location: 'Jaipur', languages: ['English', 'French'], experience: 7, tourType: 'Heritage', rating: 4.7, image: 'https://images.pexels.com/photos/27969688/pexels-photo-27969688.jpeg', bio: 'Meera specializes in art and textile tours, guiding you through the vibrant markets and artisan workshops of the Pink City.' },
  
  // Manali
  { id: 12, name: 'Rahul Thakur', location: 'Manali', languages: ['English', 'Hindi'], experience: 9, tourType: 'Adventure', rating: 4.8, image: 'https://images.pexels.com/photos/31011982/pexels-photo-31011982.jpeg', bio: 'An expert in paragliding and skiing, Rahul ensures an adrenaline-packed experience in the mountains of Manali.' },
  { id: 13, name: 'Sunita Negi', location: 'Manali', languages: ['English', 'Hindi'], experience: 6, tourType: 'Trekking', rating: 4.7, image: 'https://images.pexels.com/photos/7846482/pexels-photo-7846482.jpeg', bio: 'Sunita leads scenic treks for all skill levels, from gentle walks through apple orchards to challenging high-altitude trails.' },

  // Rishikesh
  { id: 14, name: 'Swami Anand', location: 'Rishikesh', languages: ['English', 'Hindi'], experience: 25, tourType: 'Spiritual', rating: 5.0, image: 'https://media.istockphoto.com/id/182755489/photo/young-woman-meditating-by-ganges-river-in-rishikesh-india.jpg?s=2048x2048&w=is&k=20&c=RSrPl4o3YKkOvB6Zu14rdqf2L_Do_hPj4gtiD0JFzT0=', bio: 'A yoga guru and spiritual guide, Swami Anand offers profound insights into the philosophy and practices of Rishikesh.' },
  { id: 15, name: 'Ganga Sharma', location: 'Rishikesh', languages: ['English', 'Hindi'], experience: 5, tourType: 'Adventure', rating: 4.6, image: 'https://media.istockphoto.com/id/1323037682/photo/young-men-ready-for-rafting-stock-photo.jpg?s=2048x2048&w=is&k=20&c=nk1G_EKC4jxQLCB-Vcs6qd4ZKzqwUGC_N_Hbf8lZqGM=', bio: 'Ganga is a certified river rafting guide who knows every rapid of the Ganges, ensuring a safe and thrilling adventure.' },

  // Andaman
  { id: 16, name: 'Karen D\'souza', location: 'Andaman Islands', languages: ['English', 'Hindi'], experience: 10, tourType: 'Beach', rating: 4.9, image: 'https://images.pexels.com/photos/2876797/pexels-photo-2876797.jpeg', bio: 'A PADI certified divemaster, Karen reveals the stunning underwater world of the Andaman Islands\' coral reefs.' },
  { id: 17, name: 'Rajesh Kumar', location: 'Andaman Islands', languages: ['English', 'Hindi', 'Tamil'], experience: 8, tourType: 'Adventure', rating: 4.7, image: 'https://images.pexels.com/photos/15392178/pexels-photo-15392178.jpeg', bio: 'From sea kayaking through mangrove forests to visiting historic Cellular Jail, Rajesh covers all of Andaman\'s adventures.' },

  // Varanasi
  { id: 18, name: 'Pandit Mishra', location: 'Varanasi', languages: ['Hindi', 'Sanskrit', 'English'], experience: 30, tourType: 'Spiritual', rating: 5.0, image: 'https://images.pexels.com/photos/20880584/pexels-photo-20880584.jpeg', bio: 'Pandit Mishra offers a deeply spiritual experience, explaining the ancient rituals and philosophies of the sacred city of Varanasi.' },
  { id: 19, name: 'Aditi Gupta', location: 'Varanasi', languages: ['English', 'Hindi'], experience: 6, tourType: 'Heritage', rating: 4.6, image: 'https://images.pexels.com/photos/19906986/pexels-photo-19906986.jpeg', bio: 'Aditi takes you on a journey through the narrow lanes, ancient temples, and silk weaving workshops of Varanasi.' },

  // Hampi
  { id: 20, name: 'Krishna Devaraj', location: 'Hampi', languages: ['English', 'Kannada', 'Telugu'], experience: 15, tourType: 'Heritage', rating: 4.9, image: 'https://media.istockphoto.com/id/1356564635/photo/man-standing-at-a-pillar-inside-old-ruins-at-hampi-karnataka.jpg?s=2048x2048&w=is&k=20&c=PtzM9TDsdvBZ1heB4wcCAC1GuI7rwbxJE5C3gUJ9_QM=', bio: 'An archaeologist by training, Krishna brings the magnificent ruins of the Vijayanagara Empire to life.' },
  { id: 21, name: 'Prakash Rao', location: 'Hampi', languages: ['English', 'Hindi'], experience: 7, tourType: 'Nature', rating: 4.7, image: 'https://images.pexels.com/photos/3234494/pexels-photo-3234494.jpeg', bio: 'Prakash focuses on the unique boulder-strewn landscape of Hampi, offering rock climbing and nature walks.' },

  // Udaipur
  { id: 22, name: 'Aarav Singh', location: 'Udaipur', languages: ['English', 'Hindi'], experience: 10, tourType: 'Heritage', rating: 4.8, image: 'https://images.pexels.com/photos/23696192/pexels-photo-23696192.jpeg', bio: 'Experience the romance of the City of Lakes with Aarav, who specializes in palace tours and sunset boat rides.'},
  { id: 23, name: 'Chitra Shekhawat', location: 'Udaipur', languages: ['English', 'Marwari'], experience: 8, tourType: 'Nature', rating: 4.7, image: 'https://images.pexels.com/photos/19558275/pexels-photo-19558275.jpeg', bio: 'Chitra takes you beyond the city to explore the beautiful countryside, wildlife, and rural villages around Udaipur.'},

  // More variety
  { id: 24, name: 'Isabelle Moreau', location: 'Goa', languages: ['French', 'English'], experience: 6, tourType: 'Beach', rating: 4.7, image: 'https://images.pexels.com/photos/15595561/pexels-photo-15595561.jpeg', bio: 'Isabelle offers curated experiences for French-speaking travelers, focusing on the boutique and culinary scene in Goa.'},
  { id: 25, name: 'Kenji Tanaka', location: 'Varanasi', languages: ['Japanese', 'English'], experience: 9, tourType: 'Spiritual', rating: 4.9, image: 'https://media.istockphoto.com/id/1755473742/photo/kathmandu-stupa.jpg?s=2048x2048&w=is&k=20&c=xwy8gu6arSVjiIZkn0KJKXPnjIkATJgRPMbweNFXgBo=', bio: 'Kenji provides tours for Japanese visitors, bridging cultural gaps to provide a comfortable and profound spiritual journey.'},
];


export const TOUR_TYPE_STYLES: Record<TourType, TourTypeStyles> = {
  Beach: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 001.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" }), React.createElement('path', { d: "M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" })), color: 'bg-sky-100 text-sky-800' },
  Trekking: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z", clipRule: "evenodd" })), color: 'bg-stone-200 text-stone-800' },
  Spiritual: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.464A1 1 0 106.465 13.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm-.707-2.121a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" })), color: 'bg-amber-100 text-amber-800' },
  Heritage: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.546A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.546-1.276z", clipRule: "evenodd" })), color: 'bg-rose-100 text-rose-800' },
  Nature: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h10a3 3 0 013 3v5a.997.997 0 01-.293.707zM5 4a1 1 0 00-1 1v5l5.707 5.707a1 1 0 001.414 0L17 10V5a1 1 0 00-1-1H5z", clipRule: "evenodd" }), React.createElement('path', { fillRule: "evenodd", d: "M8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z", clipRule: "evenodd" })), color: 'bg-lime-100 text-lime-800' },
  Adventure: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.527 1.907 6.011 6.011 0 01-1.6 2.581 5.114 5.114 0 01-2.523.942A4.493 4.493 0 018 12.5a4.493 4.493 0 01-1.544-.298A5.114 5.114 0 013.932 9.92a6.011 6.011 0 01.4-1.893z", clipRule: "evenodd" })), color: 'bg-red-100 text-red-800' },
};

export const VEHICLE_TYPE_STYLES: Record<VehicleType, { icon: React.JSX.Element }> = {
  Cab: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })) },
  Auto: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10h6" })) },
  Bike: { icon: React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" })) },
};

export const LOCAL_TRANSPORT_VENDORS: TransportVendor[] = [
  // Goa
  { id: 1, name: 'Goa Miles', location: 'Goa', vehicleType: 'Cab', model: 'Sedan (AC)', price: '₹15/km', image: 'https://source.unsplash.com/400x300/?taxi,car' },
  { id: 2, name: 'Goa Bike Rentals', location: 'Goa', vehicleType: 'Bike', model: 'Scooter', price: '₹400/day', image: 'https://source.unsplash.com/400x300/?scooter' },
  { id: 3, name: 'Panjim Rickshaw Union', location: 'Goa', vehicleType: 'Auto', model: '3-Wheeler', price: 'Metered', image: 'https://source.unsplash.com/400x300/?auto,rickshaw' },
  
  // Jaipur
  { id: 4, name: 'Pink City Cabs', location: 'Jaipur', vehicleType: 'Cab', model: 'SUV (AC)', price: '₹18/km', image: 'https://source.unsplash.com/400x300/?suv,car' },
  { id: 5, name: 'Jaipur Auto Connect', location: 'Jaipur', vehicleType: 'Auto', model: 'Electric Rickshaw', price: 'Metered', image: 'https://source.unsplash.com/400x300/?electric,rickshaw' },
  { id: 6, name: 'Royal Riders', location: 'Jaipur', vehicleType: 'Bike', model: 'Royal Enfield', price: '₹1200/day', image: 'https://source.unsplash.com/400x300/?royal,enfield,motorcycle' },

  // Manali
  { id: 7, name: 'Himalayan Taxi', location: 'Manali', vehicleType: 'Cab', model: 'SUV (4x4)', price: '₹25/km', image: 'https://source.unsplash.com/400x300/?4x4,suv' },
  { id: 8, name: 'Manali Bike Rentals', location: 'Manali', vehicleType: 'Bike', model: 'Mountain Bike', price: '₹800/day', image: 'https://source.unsplash.com/400x300/?mountain,bike' },
  
  // Kerala
  { id: 9, name: 'Kerala Taxi', location: 'Kerala', vehicleType: 'Cab', model: 'Sedan (AC)', price: '₹16/km', image: 'https://source.unsplash.com/400x300/?sedan,car' },
  { id: 10, name: 'Backwater Bikes', location: 'Kerala', vehicleType: 'Bike', model: 'Scooter', price: '₹350/day', image: 'https://source.unsplash.com/400x300/?vespa,scooter' },
  
  // Varanasi
  { id: 11, name: 'Kashi Auto Service', location: 'Varanasi', vehicleType: 'Auto', model: 'CNG Auto', price: 'Metered', image: 'https://source.unsplash.com/400x300/?rickshaw,india' },
  { id: 12, name: 'Ganga Taxi', location: 'Varanasi', vehicleType: 'Cab', model: 'Hatchback', price: '₹14/km', image: 'https://source.unsplash.com/400x300/?hatchback,car' },

  // Ladakh
  { id: 13, name: 'Leh Bike Adventures', location: 'Ladakh', vehicleType: 'Bike', model: 'Himalayan Bike', price: '₹1500/day', image: 'https://source.unsplash.com/400x300/?adventure,motorcycle' },
  { id: 14, name: 'Ladakh Cab Service', location: 'Ladakh', vehicleType: 'Cab', model: 'Innova Crysta', price: 'Trip based', image: 'https://source.unsplash.com/400x300/?toyota,innova' },
];

export const TRAIN_STATIONS: TrainStation[] = [
    { code: 'NDLS', name: 'New Delhi', city: 'Delhi' },
    { code: 'BCT', name: 'Mumbai Central', city: 'Mumbai' },
    { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata' },
    { code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai' },
    { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru' },
    { code: 'HYB', name: 'Hyderabad Deccan Nampally', city: 'Hyderabad' },
    { code: 'PUNE', name: 'Pune Junction', city: 'Pune' },
    { code: 'JP', name: 'Jaipur Junction', city: 'Jaipur' },
    { code: 'ADI', name: 'Ahmedabad Junction', city: 'Ahmedabad' },
    { code: 'LKO', name: 'Lucknow Charbagh NR', city: 'Lucknow' },
];

export const TRAINS_DATA: Train[] = [
    {
        id: 1, name: 'Mumbai Rajdhani', number: '12951', type: 'Rajdhani',
        fromStationCode: 'BCT', toStationCode: 'NDLS',
        departureTime: '17:00', arrivalTime: '08:35', duration: '15h 35m',
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        classes: [
            { classType: '1A', fare: 4730, availability: 'AVAILABLE', availableCount: 4 },
            { classType: '2A', fare: 2870, availability: 'RAC', availableCount: 5 },
            { classType: '3A', fare: 2085, availability: 'WAITLISTED', availableCount: 40 },
        ]
    },
    {
        id: 2, name: 'SBC Rajdhani', number: '22691', type: 'Rajdhani',
        fromStationCode: 'SBC', toStationCode: 'NDLS',
        departureTime: '20:00', arrivalTime: '05:30', duration: '33h 30m',
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        classes: [
            { classType: '1A', fare: 6575, availability: 'AVAILABLE', availableCount: 8 },
            { classType: '2A', fare: 4690, availability: 'AVAILABLE', availableCount: 22 },
            { classType: '3A', fare: 3260, availability: 'RAC', availableCount: 10 },
        ]
    },
    {
        id: 3, name: 'Duronto Express', number: '12261', type: 'Duronto',
        fromStationCode: 'BCT', toStationCode: 'HWH',
        departureTime: '17:15', arrivalTime: '20:15', duration: '27h 0m',
        daysOfOperation: ['Mon', 'Wed', 'Thu', 'Sun'],
        classes: [
            { classType: '1A', fare: 5310, availability: 'NOT AVAILABLE', availableCount: 0 },
            { classType: '2A', fare: 3125, availability: 'WAITLISTED', availableCount: 15 },
            { classType: '3A', fare: 2280, availability: 'AVAILABLE', availableCount: 55 },
        ]
    },
    {
        id: 4, name: 'Karnataka Express', number: '12627', type: 'Superfast',
        fromStationCode: 'SBC', toStationCode: 'NDLS',
        departureTime: '19:20', arrivalTime: '13:30', duration: '42h 10m',
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        classes: [
            { classType: '1A', fare: 5500, availability: 'NOT AVAILABLE', availableCount: 0 },
            { classType: '2A', fare: 3280, availability: 'AVAILABLE', availableCount: 30 },
            { classType: '3A', fare: 2265, availability: 'AVAILABLE', availableCount: 80 },
            { classType: 'SL', fare: 875, availability: 'RAC', availableCount: 12 },
        ]
    },
    {
        id: 5, name: 'Howrah Duronto', number: '12273', type: 'Duronto',
        fromStationCode: 'HWH', toStationCode: 'NDLS',
        departureTime: '12:45', arrivalTime: '06:35', duration: '17h 50m',
        daysOfOperation: ['Mon', 'Fri'],
        classes: [
            { classType: '1A', fare: 4850, availability: 'AVAILABLE', availableCount: 2 },
            { classType: '2A', fare: 2910, availability: 'RAC', availableCount: 3 },
            { classType: '3A', fare: 2120, availability: 'WAITLISTED', availableCount: 25 },
        ]
    },
    {
        id: 6, name: 'Shatabdi Express', number: '12001', type: 'Shatabdi',
        fromStationCode: 'NDLS', toStationCode: 'BCT', // Reverse direction
        departureTime: '06:00', arrivalTime: '13:50', duration: '7h 50m',
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        classes: [
            { classType: 'EC', fare: 2015, availability: 'AVAILABLE', availableCount: 10 },
            { classType: 'CC', fare: 1025, availability: 'AVAILABLE', availableCount: 150 },
        ]
    },
     {
        id: 7, name: 'Garib Rath', number: '12909', type: 'Superfast',
        fromStationCode: 'BCT', toStationCode: 'NDLS',
        departureTime: '17:35', arrivalTime: '09:40', duration: '16h 5m',
        daysOfOperation: ['Tue', 'Thu', 'Sat'],
        classes: [
            { classType: '3A', fare: 1050, availability: 'AVAILABLE', availableCount: 112 },
            { classType: 'CC', fare: 900, availability: 'WAITLISTED', availableCount: 30 },
        ]
    },
     {
        id: 8, name: 'Chennai Express', number: '12621', type: 'Superfast',
        fromStationCode: 'MAS', toStationCode: 'NDLS',
        departureTime: '22:10', arrivalTime: '06:30', duration: '32h 20m',
        daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        classes: [
            { classType: '2A', fare: 3845, availability: 'AVAILABLE', availableCount: 45 },
            { classType: '3A', fare: 2650, availability: 'AVAILABLE', availableCount: 120 },
            { classType: 'SL', fare: 1005, availability: 'RAC', availableCount: 25 },
        ]
    }
];

export const BUS_STOPS: BusStop[] = [
    { id: 1, name: 'Majestic', city: 'Bengaluru' },
    { id: 2, name: 'Madiwala', city: 'Bengaluru' },
    { id: 3, name: 'CMBT', city: 'Chennai' },
    { id: 4, name: 'Koyambedu', city: 'Chennai' },
    { id: 5, name: 'MGBS', city: 'Hyderabad' },
    { id: 6, name: 'Swargate', city: 'Pune' },
    { id: 7, name: 'Mumbai Central', city: 'Mumbai' },
    { id: 8, name: 'Kashmere Gate', city: 'Delhi' },
    { id: 9, name: 'Satellite Bus Station', city: 'Ahmedabad' },
];

export const BUSES_DATA: Bus[] = [
    {
        id: 1, operatorName: 'VRL Travels', busType: 'AC Sleeper',
        fromCity: 'Bengaluru', toCity: 'Chennai',
        boardingPoints: [{ time: '21:00', point: 'Majestic' }, { time: '21:30', point: 'Madiwala' }],
        droppingPoints: [{ time: '04:30', point: 'Koyambedu' }, { time: '05:00', point: 'CMBT' }],
        departureTime: '21:00', arrivalTime: '05:00', duration: '8h 0m',
        availableSeats: 15, price: 950, rating: 4.5,
        amenities: ['Water Bottle', 'Blanket', 'Charging Point', 'Live Tracking'],
        seatLayout: [
            [{id: 'L1', number: '1', isSleeper: true, isAvailable: true, berth: 'lower'}, {id: 'L2', number: '2', isSleeper: true, isAvailable: true, berth: 'lower'}, null, {id: 'L3', number: '3', isSleeper: true, isAvailable: true, berth: 'lower'}],
            [{id: 'L4', number: '4', isSleeper: true, isAvailable: false, berth: 'lower'}, {id: 'L5', number: '5', isSleeper: true, isAvailable: true, berth: 'lower'}, null, {id: 'L6', number: '6', isSleeper: true, isAvailable: true, isFemaleSeat: true, berth: 'lower'}],
            [{id: 'L7', number: '7', isSleeper: true, isAvailable: true, berth: 'lower'}, {id: 'L8', number: '8', isSleeper: true, isAvailable: true, berth: 'lower'}, null, {id: 'L9', number: '9', isSleeper: true, isAvailable: false, berth: 'lower'}],
            [{id: 'U1', number: '1', isSleeper: true, isAvailable: true, berth: 'upper'}, {id: 'U2', number: '2', isSleeper: true, isAvailable: false, berth: 'upper'}, null, {id: 'U3', number: '3', isSleeper: true, isAvailable: true, berth: 'upper'}],
            [{id: 'U4', number: '4', isSleeper: true, isAvailable: true, berth: 'upper'}, {id: 'U5', number: '5', isSleeper: true, isAvailable: true, berth: 'upper'}, null, {id: 'U6', number: '6', isSleeper: true, isAvailable: false, isFemaleSeat: true, berth: 'upper'}],
            [{id: 'U7', number: '7', isSleeper: true, isAvailable: true, berth: 'upper'}, {id: 'U8', number: '8', isSleeper: true, isAvailable: false, berth: 'upper'}, null, {id: 'U9', number: '9', isSleeper: true, isAvailable: true, berth: 'upper'}],
        ],
    },
    {
        id: 2, operatorName: 'KPN Travels', busType: 'Non-AC Seater',
        fromCity: 'Bengaluru', toCity: 'Chennai',
        boardingPoints: [{ time: '22:00', point: 'Anand Rao Circle' }, { time: '22:30', point: 'Silk Board' }],
        droppingPoints: [{ time: '05:30', point: 'Guindy' }, { time: '06:00', point: 'CMBT' }],
        departureTime: '22:00', arrivalTime: '06:00', duration: '8h 0m',
        availableSeats: 25, price: 550, rating: 4.2,
        amenities: ['Live Tracking'],
        seatLayout: [
            [{id: 'S1', number: '1', isSleeper: false, isAvailable: true}, {id: 'S2', number: '2', isSleeper: false, isAvailable: true}, null, {id: 'S3', number: '3', isSleeper: false, isAvailable: false}, {id: 'S4', number: '4', isSleeper: false, isAvailable: true}],
            [{id: 'S5', number: '5', isSleeper: false, isAvailable: true}, {id: 'S6', number: '6', isSleeper: false, isAvailable: false, isFemaleSeat: true}, null, {id: 'S7', number: '7', isSleeper: false, isAvailable: true}, {id: 'S8', number: '8', isSleeper: false, isAvailable: true}],
            [{id: 'S9', number: '9', isSleeper: false, isAvailable: true}, {id: 'S10', number: '10', isSleeper: false, isAvailable: true}, null, {id: 'S11', number: '11', isSleeper: false, isAvailable: false}, {id: 'S12', number: '12', isSleeper: false, isAvailable: true}],
        ]
    },
    {
        id: 3, operatorName: 'Sharma Transports', busType: 'Volvo Multi-Axle',
        fromCity: 'Bengaluru', toCity: 'Hyderabad',
        boardingPoints: [{ time: '20:30', point: 'Hebbal' }, { time: '21:00', point: 'Mekhri Circle' }],
        droppingPoints: [{ time: '06:00', point: 'MGBS' }],
        departureTime: '20:30', arrivalTime: '06:00', duration: '9h 30m',
        availableSeats: 18, price: 1200, rating: 4.8,
        amenities: ['WiFi', 'Water Bottle', 'Blanket', 'Charging Point'],
        seatLayout: [
            [{id: 'S1', number: 'A1', isSleeper: false, isAvailable: true}, {id: 'S2', number: 'A2', isSleeper: false, isAvailable: false}, null, {id: 'S3', number: 'A3', isSleeper: false, isAvailable: true}, {id: 'S4', number: 'A4', isSleeper: false, isAvailable: true}],
            [{id: 'S5', number: 'B1', isSleeper: false, isAvailable: true, isFemaleSeat: true}, {id: 'S6', number: 'B2', isSleeper: false, isAvailable: true}, null, {id: 'S7', number: 'B3', isSleeper: false, isAvailable: false}, {id: 'S8', number: 'B4', isSleeper: false, isAvailable: true}],
        ]
    },
    {
        id: 4, operatorName: 'Orange Tours', busType: 'AC Seater',
        fromCity: 'Pune', toCity: 'Mumbai',
        boardingPoints: [{ time: '08:00', point: 'Swargate' }, { time: '08:30', point: 'Wakad' }],
        droppingPoints: [{ time: '12:00', point: 'Dadar' }, { time: '12:30', point: 'Borivali' }],
        departureTime: '08:00', arrivalTime: '12:30', duration: '4h 30m',
        availableSeats: 30, price: 600, rating: 4.6,
        amenities: ['Charging Point', 'Live Tracking'],
        seatLayout: [
            [{id: 'S1', number: '1', isSleeper: false, isAvailable: true}, {id: 'S2', number: '2', isSleeper: false, isAvailable: true}, null, {id: 'S3', number: '3', isSleeper: false, isAvailable: true}, {id: 'S4', number: '4', isSleeper: false, isAvailable: false}],
            [{id: 'S5', number: '5', isSleeper: false, isAvailable: true}, {id: 'S6', number: '6', isSleeper: false, isAvailable: true}, null, {id: 'S7', number: '7', isSleeper: false, isAvailable: true}, {id: 'S8', number: '8', isSleeper: false, isAvailable: true}],
        ]
    },
     {
        id: 5, operatorName: 'SRS Travels', busType: 'Semi-Sleeper',
        fromCity: 'Chennai', toCity: 'Bengaluru',
        boardingPoints: [{ time: '22:30', point: 'CMBT' }, { time: '23:00', point: 'Poonamallee' }],
        droppingPoints: [{ time: '05:30', point: 'Madiwala' }, { time: '06:00', point: 'Majestic' }],
        departureTime: '22:30', arrivalTime: '06:00', duration: '7h 30m',
        availableSeats: 22, price: 800, rating: 4.3,
        amenities: ['Water Bottle', 'Charging Point'],
        seatLayout: [
            [{id: 'S1', number: '1', isSleeper: false, isAvailable: true}, {id: 'S2', number: '2', isSleeper: false, isAvailable: false}, null, {id: 'S3', number: '3', isSleeper: false, isAvailable: true}, {id: 'S4', number: '4', isSleeper: false, isAvailable: true}],
            [{id: 'S5', number: '5', isSleeper: false, isAvailable: true}, {id: 'S6', number: '6', isSleeper: false, isAvailable: true}, null, {id: 'S7', number: '7', isSleeper: false, isAvailable: false}, {id: 'S8', number: '8', isSleeper: false, isAvailable: true}],
        ]
    },
    {
        id: 6, operatorName: 'Greenline', busType: 'Volvo Multi-Axle',
        fromCity: 'Bengaluru', toCity: 'Pune',
        boardingPoints: [{ time: '18:00', point: 'Majestic' }],
        droppingPoints: [{ time: '08:00', point: 'Swargate' }],
        departureTime: '18:00', arrivalTime: '08:00', duration: '14h 0m',
        availableSeats: 10, price: 1500, rating: 4.7,
        amenities: ['WiFi', 'Water Bottle', 'Blanket', 'Charging Point', 'Live Tracking'],
        seatLayout: [
             [{id: 'S1', number: 'A1', isSleeper: false, isAvailable: true}, {id: 'S2', number: 'A2', isSleeper: false, isAvailable: false}, null, {id: 'S3', number: 'A3', isSleeper: false, isAvailable: true}, {id: 'S4', number: 'A4', isSleeper: false, isAvailable: true}],
             [{id: 'S5', number: 'B1', isSleeper: false, isAvailable: false}, {id: 'S6', number: 'B2', isSleeper: false, isAvailable: true}, null, {id: 'S7', number: 'B3', isSleeper: false, isAvailable: false}, {id: 'S8', number: 'B4', isSleeper: false, isAvailable: true}],
        ]
    }
];

export const CITIES_DATA = ['Bengaluru', 'Chennai', 'Delhi', 'Goa', 'Hyderabad', 'Jaipur', 'Kolkata', 'Mumbai', 'Pune'];
export const AIRPORTS_DATA = [
    { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bengaluru' },
    { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai' },
    { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi' },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj Int\'l Airport', city: 'Mumbai' },
    { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad' },
    { code: 'CCU', name: 'Netaji Subhas Chandra Bose Int\'l Airport', city: 'Kolkata' },
];

export const CABS_DATA: Cab[] = [
    // Outstation
    {
        id: 1, serviceType: 'Outstation', carCategory: 'Sedan', carModel: 'Maruti Dzire or similar', capacity: 4, luggage: 2, price: 3450, rating: 4.6, fromCity: 'Bengaluru', toCity: 'Chennai', outstationTripType: 'one-way',
        image: 'https://images.unsplash.com/photo-1594951944522-a894a1936b76?w=500&q=80',
        fareDetails: { baseFare: 2800, driverAllowance: 300, tolls: 270, gst: 172, inclusions: ['Base Fare', 'Driver Allowance', 'Tolls & Taxes'], exclusions: ['Parking', 'Extra KMs'] }
    },
    {
        id: 2, serviceType: 'Outstation', carCategory: 'SUV', carModel: 'Toyota Innova Crysta', capacity: 6, luggage: 4, price: 5200, rating: 4.8, fromCity: 'Mumbai', toCity: 'Pune', outstationTripType: 'one-way',
        image: 'https://images.unsplash.com/photo-1616422285855-ab45c928a5e7?w=500&q=80',
        fareDetails: { baseFare: 4200, driverAllowance: 400, tolls: 340, gst: 260, inclusions: ['Base Fare', 'Driver Allowance', 'Tolls & Taxes'], exclusions: ['Parking', 'Extra KMs'] }
    },
    // Airport
    {
        id: 3, serviceType: 'Airport', carCategory: 'Hatchback', carModel: 'Maruti Swift or similar', capacity: 4, luggage: 2, price: 850, rating: 4.5, airport: 'BLR', city: 'Bengaluru', airportTripType: 'drop',
        image: 'https://images.unsplash.com/photo-1605844885853-273a4d3d2a75?w=500&q=80',
        fareDetails: { baseFare: 700, tolls: 100, gst: 50, inclusions: ['Base Fare', 'Tolls', 'GST'], exclusions: ['Parking', 'Waiting Charges'] }
    },
    {
        id: 4, serviceType: 'Airport', carCategory: 'Sedan', carModel: 'Honda City or similar', capacity: 4, luggage: 3, price: 1250, rating: 4.7, airport: 'DEL', city: 'Delhi', airportTripType: 'pickup',
        image: 'https://images.unsplash.com/photo-1617469767050-14e427b53a53?w=500&q=80',
        fareDetails: { baseFare: 1000, tolls: 150, gst: 100, inclusions: ['Base Fare', 'Tolls', 'GST', 'Driver Greeting'], exclusions: ['Parking'] }
    },
    // Local
    {
        id: 5, serviceType: 'Local', carCategory: 'SUV', carModel: 'Mahindra XUV500', capacity: 6, luggage: 4, price: 2500, rating: 4.7, city: 'Jaipur', localPackage: '8hr-80km',
        image: 'https://images.unsplash.com/photo-1617808929758-c7d337c1a847?w=500&q=80',
        fareDetails: { baseFare: 2200, gst: 300, inclusions: ['8 Hours & 80 Kms', 'GST'], exclusions: ['Parking', 'Tolls', 'Extra KMs/Hrs'] }
    },
    {
        id: 6, serviceType: 'Local', carCategory: 'Hatchback', carModel: 'Hyundai i10', capacity: 4, luggage: 1, price: 1300, rating: 4.4, city: 'Goa', localPackage: '4hr-40km',
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80',
        fareDetails: { baseFare: 1150, gst: 150, inclusions: ['4 Hours & 40 Kms', 'GST'], exclusions: ['Parking', 'Tolls', 'Extra KMs/Hrs'] }
    },
    // More options for variety
    {
        id: 7, serviceType: 'Outstation', carCategory: 'Luxury', carModel: 'Mercedes-Benz E-Class', capacity: 4, luggage: 3, price: 12000, rating: 4.9, fromCity: 'Delhi', toCity: 'Jaipur', outstationTripType: 'round-trip',
        image: 'https://images.unsplash.com/photo-1617469767050-14e427b53a53?w=500&q=80',
        fareDetails: { baseFare: 9500, driverAllowance: 1000, tolls: 800, gst: 700, inclusions: ['Base Fare', 'Driver Allowance', 'Tolls & Taxes'], exclusions: ['Parking', 'Extra KMs'] }
    },
    {
        id: 8, serviceType: 'Airport', carCategory: 'SUV', carModel: 'Innova Crysta', capacity: 7, luggage: 5, price: 1800, rating: 4.8, airport: 'BOM', city: 'Mumbai', airportTripType: 'pickup',
        image: 'https://images.unsplash.com/photo-1616422285855-ab45c928a5e7?w=500&q=80',
        fareDetails: { baseFare: 1400, tolls: 250, gst: 150, inclusions: ['Base Fare', 'Tolls', 'GST', 'Driver Greeting'], exclusions: ['Parking'] }
    },
    {
        id: 9, serviceType: 'Local', carCategory: 'Sedan', carModel: 'Toyota Etios', capacity: 4, luggage: 2, price: 3200, rating: 4.6, city: 'Mumbai', localPackage: '12hr-120km',
        image: 'https://images.unsplash.com/photo-1594951944522-a894a1936b76?w=500&q=80',
        fareDetails: { baseFare: 2800, gst: 400, inclusions: ['12 Hours & 120 Kms', 'GST'], exclusions: ['Parking', 'Tolls', 'Extra KMs/Hrs'] }
    },
];

export const ACTIVITY_CATEGORIES: { name: ActivityCategory, image: string, color: string }[] = [
    { name: 'Cultural', image: 'https://images.unsplash.com/photo-1598615233158-a5a41547a468?q=80&w=600', color: 'bg-rose-500' },
    { name: 'Adventure', image: 'https://images.unsplash.com/photo-1534295399538-9b5a6f5e3e3b?q=80&w=600', color: 'bg-orange-500' },
    { name: 'Food', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600', color: 'bg-amber-500' },
    { name: 'Sightseeing', image: 'https://images.unsplash.com/photo-1582268297390-50a3b2a65bab?q=80&w=600', color: 'bg-sky-500' },
    { name: 'Nature & Wildlife', image: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=600', color: 'bg-green-500' },
    { name: 'Workshop', image: 'https://images.unsplash.com/photo-1579737599092-c0c17be99873?q=80&w=600', color: 'bg-indigo-500' },
];

export const ACTIVITIES_DATA: Activity[] = [
  {
    id: 1, title: 'Old Delhi Street Food & Heritage Walk', location: 'Delhi', category: 'Food',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/22/b4/a6.jpg',
    gallery: ['https://source.unsplash.com/800x600/?delhi,food', 'https://source.unsplash.com/800x600/?jama-masjid', 'https://source.unsplash.com/800x600/?delhi,market'],
    shortDescription: 'Taste authentic Old Delhi street food and explore the bustling lanes of Chandni Chowk.',
    longDescription: 'This tour is a sensory explosion. Weave through the historic lanes of Old Delhi, sample iconic dishes like parathas, kebabs, and jalebis from century-old stalls, and discover hidden architectural gems along the way. Your expert guide will share stories that bring the history of Mughal-era Delhi to life.',
    duration: '4 Hours', price: 2500, rating: 4.9, reviewsCount: 850,
    inclusions: ['Guide', 'Meals'],
    whatToKnow: ['Wear comfortable walking shoes.', 'Come with an empty stomach!', 'Be prepared for crowded streets.'],
    itinerary: [
      { time: '4:00 PM', description: 'Meet at Chawri Bazar Metro Station, Gate No. 3.' },
      { time: '4:15 PM', description: 'Begin the food walk, tasting delights at various famous spots.' },
      { time: '6:00 PM', description: 'Visit the Jama Masjid (exterior view) and learn its history.' },
      { time: '7:00 PM', description: 'Explore the spice market (Khari Baoli).' },
      { time: '8:00 PM', description: 'Tour ends with a final sweet dish.' },
    ]
  },
  {
    id: 2, title: 'Jaipur Hot Air Balloon Experience', location: 'Jaipur', category: 'Adventure',
    image: 'https://www.skywaltz.com/wp-content/uploads/2023/08/14.jpg',
    gallery: ['https://source.unsplash.com/800x600/?hot-air-balloon,jaipur', 'https://source.unsplash.com/800x600/?amber-fort,aerial', 'https://source.unsplash.com/800x600/?rajasthan,village,aerial'],
    shortDescription: 'Witness a breathtaking sunrise over Jaipur\'s forts and palaces from a hot air balloon.',
    longDescription: 'Experience the magic of the Pink City from a unique perspective. As you gently float in the sky, you\'ll get a panoramic view of Amber Fort, sleepy villages, and the Aravalli mountain range. This is a serene yet thrilling adventure you won\'t forget.',
    duration: '3 Hours (approx. 1 hour flight)', price: 8500, rating: 4.8, reviewsCount: 430,
    inclusions: ['Transfers', 'Guide'],
    whatToKnow: ['Subject to weather conditions.', 'Pickup is very early in the morning (around 5 AM).', 'Not recommended for pregnant women or children under 5.'],
    itinerary: [
      { time: '5:00 AM', description: 'Pickup from your hotel in Jaipur.' },
      { time: '5:45 AM', description: 'Arrive at the launch site, watch the balloon inflation.' },
      { time: '6:15 AM', description: 'Take off and enjoy the one-hour flight.' },
      { time: '7:15 AM', description: 'Landing and post-flight refreshments.' },
      { time: '8:30 AM', description: 'Drop back to your hotel.' },
    ]
  },
  {
    id: 3, title: 'Ranthambore Tiger Safari', location: 'Ranthambore', category: 'Nature & Wildlife',
    image: 'https://ranthambhorenationalpark.in/images/easyblog_articles/257/b2ap3_large_Ranthambore-Safari.jpg',
    gallery: ['https://source.unsplash.com/800x600/?tiger,india', 'https://source.unsplash.com/800x600/?ranthambore,fort', 'https://source.unsplash.com/800x600/?safari,jeep'],
    shortDescription: 'Embark on a thrilling jeep safari in Ranthambore National Park to spot the majestic Bengal tiger.',
    longDescription: 'Explore the wild landscapes of one of India\'s most famous national parks. Besides tigers, Ranthambore is home to leopards, sloth bears, sambar deer, and a rich variety of birdlife. An experienced naturalist will guide you through the park\'s zones, increasing your chances of a memorable sighting.',
    duration: '3.5 Hours', price: 3200, rating: 4.6, reviewsCount: 1200,
    inclusions: ['Entry Tickets', 'Guide'],
    whatToKnow: ['Safari zones are allocated by the forest department.', 'Sightings are a matter of chance.', 'Bring binoculars and a camera.'],
  },
  {
    id: 4, title: 'Backwaters Houseboat Day Cruise', location: 'Alleppey, Kerala', category: 'Sightseeing',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/f3/1b/4a/alleppey-backwater-cruise.jpg?w=900&h=500&s=1',
    gallery: ['https://source.unsplash.com/800x600/?kerala,backwaters', 'https://source.unsplash.com/800x600/?houseboat,kerala', 'https://source.unsplash.com/800x600/?kerala,food'],
    shortDescription: 'Relax on a traditional houseboat and savor a delicious Keralan lunch as you glide through serene backwaters.',
    longDescription: 'Escape the hustle and bustle with a peaceful day cruise through the enchanting network of lakes, canals, and lagoons in Alleppey. Witness local life, lush paddy fields, and coconut groves from the comfort of your Kettuvallam (houseboat). A freshly prepared traditional lunch is the highlight of the trip.',
    duration: '5 Hours', price: 1800, rating: 4.9, reviewsCount: 950,
    inclusions: ['Meals'],
    whatToKnow: ['The boat is private for your group.', 'Check-in is typically around 12:00 PM.'],
    itinerary: [
      { time: '12:00 PM', description: 'Board the houseboat and welcome drink.' },
      { time: '12:30 PM', description: 'Cruise starts through the backwaters.' },
      { time: '1:30 PM', description: 'Traditional Keralan lunch is served on board.' },
      { time: '2:30 PM', description: 'Continue cruising through villages and narrow canals.' },
      { time: '5:00 PM', description: 'Tour ends at the starting point.' },
    ]
  },
  {
    id: 5, title: 'Mumbai Film City Tour', location: 'Mumbai', category: 'Cultural',
    image: 'https://media.assettype.com/deccanherald/import/sites/dh/files/article_images/2018/12/25/file6xrimuyl6fcv08ou9yb-1545753048.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
    gallery: ['https://source.unsplash.com/800x600/?bollywood,set', 'https://source.unsplash.com/800x600/?film,camera', 'https://source.unsplash.com/800x600/?mumbai,studio'],
    shortDescription: 'Go behind the scenes of Bollywood with a guided tour of a real film studio.',
    longDescription: 'Get a glimpse into the magic of Indian cinema! This tour takes you through the sprawling Dadasaheb Phalke Chitranagari (Film City). See live shooting sets (from a distance), explore famous studio locations, and learn about the techniques of filmmaking. You might even get to see a TV star!',
    duration: '2 Hours', price: 1500, rating: 4.2, reviewsCount: 600,
    inclusions: ['Guide', 'Entry Tickets'],
    whatToKnow: ['Photography is restricted in some areas.', 'Live shooting sightings are not guaranteed.'],
  },
  {
    id: 6, title: 'Goan Pottery Workshop', location: 'Goa', category: 'Workshop',
    image: 'https://media.assettype.com/gomantaktimes%2F2025-01-23%2Fm6t2e9az%2FABIGAIL.jpg?w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85',
    gallery: ['https://source.unsplash.com/800x600/?pottery,wheel', 'https://source.unsplash.com/800x600/?clay,hands', 'https://source.unsplash.com/800x600/?goa,art'],
    shortDescription: 'Get your hands dirty and learn the basics of pottery from a local Goan artist.',
    longDescription: 'Unleash your creativity in this fun and therapeutic pottery workshop. Learn the fundamentals of wheel-throwing and hand-building techniques from an experienced local artisan. It\'s a perfect way to spend a peaceful afternoon and create a unique souvenir to take home.',
    duration: '2.5 Hours', price: 2200, rating: 4.8, reviewsCount: 150,
    inclusions: ['Guide'],
    whatToKnow: ['All materials are provided.', 'Your creation can be fired and collected later or shipped (at extra cost).'],
  }
];
