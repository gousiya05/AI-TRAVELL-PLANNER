import React from 'react';
import GuideFinder from './GuideFinder';

const shopItems = [
  { name: 'Travel Backpack', price: '$79.99', image: 'https://images.pexels.com/photos/17492091/pexels-photo-17492091.jpeg' },
  { name: 'Neck Pillow', price: '$24.99', image: 'https://media.istockphoto.com/id/1189191417/photo/young-woman-with-a-neck-pillow.jpg?s=2048x2048&w=is&k=20&c=XvrdLJKLdB5HcazJTOOolQAf0KDNB3n84lsTYN1JyTk=' },
  { name: 'Portable Charger', price: '$49.99', image: 'https://images.pexels.com/photos/3921704/pexels-photo-3921704.jpeg' },
  { name: 'Universal Adapter', price: '$19.99', image: 'https://images.pexels.com/photos/32665241/pexels-photo-32665241.jpeg' },
  { name: 'Waterproof Phone Case', price: '$15.99', image: 'https://images.pexels.com/photos/5531123/pexels-photo-5531123.jpeg' },
  { name: 'Packing Cubes Set', price: '$34.99', image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTYqb8Dzjn0jm6q66O8UCchQ4V0xVR5hokQkgMHl9uKdTGax7sYYhVWqXFvFUcuN1m5d4vk-7XQLPWuwRGJM2od1-Jqv7E5N7RXn0kd5hFn5ZefStFaGG5N' },
];

const ProductCard: React.FC<{ item: typeof shopItems[0] }> = ({ item }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300">
    <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-lg text-teal-600 font-bold mt-2">{item.price}</p>
      <button className="mt-4 w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600 transition-colors">
        Add to Cart
      </button>
    </div>
  </div>
);

const TravelShop: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const handleStartShopping = () => {
    document.getElementById('travel-essentials')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="py-20 pt-24 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        <button onClick={onBack} className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Home
        </button>
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-teal-600">Travel</span> Shop
            </h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
                Gear up for your adventure! Find everything from travel essentials to local guides to make your trip unforgettable.
            </p>
            <button
              onClick={handleStartShopping}
              className="mt-6 px-8 py-3 bg-rose-500 text-white font-bold rounded-lg shadow-lg hover:bg-rose-600 transition-transform transform hover:scale-105"
            >
              Start Shopping
            </button>
        </div>

        <section id="travel-essentials" className="mb-24">
            <h3 className="text-3xl font-bold mb-8 text-center">Travel Essentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {shopItems.map(item => <ProductCard key={item.name} item={item} />)}
            </div>
        </section>

        <GuideFinder />
      </div>
    </div>
  );
};

export default TravelShop;