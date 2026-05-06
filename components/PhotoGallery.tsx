
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const galleryImages = [
  'https://images.unsplash.com/photo-1468413253725-0d5181091126?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYWNofGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1723780821848-c401df7b31b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZSUyMHRyYXZlbGxpbmd8ZW58MHx8MHx8fDA%3D',
  'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D',
  'https://media.istockphoto.com/id/1221548744/photo/a-woman-with-white-hat-walks-down-a-tropical-paradise-beach-with-palm-trees-and-turquoise-sea.webp?a=1&b=1&s=612x612&w=0&k=20&c=PgTImHKNDIIIMJYJX9dPON756y-NsUj53LjQnCNVCUE=',
  'https://images.unsplash.com/photo-1483691278019-cb7253bee49f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdhdGVyfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVpbGRpbmd8ZW58MHx8MHx8fDA%3D',
  'https://media.istockphoto.com/id/185206942/photo/tropical-garden-with-picnic-benches.webp?a=1&b=1&s=612x612&w=0&k=20&c=b8MZJg1wwcvY5Xa0-wnK4uVwUMCdI7cDvBJ-YECuFUQ=',
  'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y3J1aXNlfGVufDB8fDB8fHww',
  'https://media.istockphoto.com/id/1157048446/photo/aerial-shot-of-the-beach-from-above-showing-sea-beach-mountain-and-a-coconut-plantation-goa.webp?a=1&b=1&s=612x612&w=0&k=20&c=B-EJFh_gBK-K1mj2s6S0ug65bM8LOkX7HcE_bTD4nag=',
  'https://media.istockphoto.com/id/1031430214/photo/young-woman-kayaking-through-the-backwaters-of-monroe-island.webp?a=1&b=1&s=612x612&w=0&k=20&c=BaGIQLeJVZAFy3ktpPYfhFhvXNv3yGltWcOzljwZUUc=',
  'https://images.unsplash.com/photo-1669628182335-4c50980f419d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1661534423649-e22416afd7e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9hdHMlMjBpbiUyMGluZGlhJTIwdHJhdmVsbGluZ3xlbnwwfHwwfHx8MA%3D%3D',
];

const PhotoGallery: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      id="gallery" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-gray-100 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto px-6">
        <h4 className="text-center text-4xl font-bold mb-12">
          <span className="text-teal-600">Photo</span> Gallery
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((imageUrl, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <img
                className="h-auto w-full max-w-full object-cover transform hover:scale-110 transition-transform duration-500"
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
