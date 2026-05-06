
import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: `https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D`,
    title: 'Take Your Dream Vacation',
    subtitle: 'Witness the timeless beauty of the most iconic destinations.',
    align: 'center',
  },
  {
    image: `https://images.unsplash.com/photo-1627894485200-b92fb4353967?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhpbWFjaGFsJTIwcHJhZGVzaCUyMGluZGlhfGVufDB8fDB8fHww`,
    title: 'Himalayan Escapes in Himachal',
    subtitle: 'Discover serene valleys, snow-capped peaks, and thrilling adventures.',
    align: 'left',
  },
  {
    image: `https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2VyYWxhJTIwYmFja3dhdGVyc3xlbnwwfHwwfHx8MA%3D%3D`,
    title: 'Serene Kerala Backwaters',
    subtitle: "Glide through tranquil waters and lush greenery in God's Own Country.",
    align: 'right',
  },
   {
    image: `https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D`,
    title: 'Golden Beaches of Goa',
    subtitle: 'Sun, sand, and sea. Discover the vibrant shores of Goa.',
    align: 'center',
  },
  {
    image: `https://plus.unsplash.com/premium_photo-1661901647310-4deafc6f29a5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGF3YSUyMG1haGFsJTIwamFpcHVyJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D`,
    title: 'Royal Jaipur Palaces',
    subtitle: 'Explore the rich history and stunning architecture of the Pink City.',
    align: 'left',
  },
];

interface HeroProps {
  onNavigate: (anchor: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getAlignmentClass = (align: string) => {
    switch (align) {
      case 'left':
        return 'items-start text-left';
      case 'right':
        return 'items-end text-right';
      case 'center':
      default:
        return 'items-center text-center';
    }
  };

  const handleLearnMoreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('#popular');
  };

  return (
    <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden pt-14">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            key={currentSlide} // Add key to reset animation on slide change
            className={`absolute inset-0 bg-cover bg-center ${index === currentSlide ? 'kenburns-bg' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
            <div className={`w-full md:w-3/4 lg:w-2/3 flex flex-col ${getAlignmentClass(slide.align)}`}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h2>
              <h5 className="text-lg md:text-xl text-gray-200 mt-4 hidden md:block drop-shadow-md">
                {slide.subtitle}
              </h5>
              <a href="#popular" onClick={handleLearnMoreClick} className="mt-8 px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105">
                Learn More
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
