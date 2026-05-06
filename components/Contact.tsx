import React, { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Icons as components for reusability
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const MapPinIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const CopyIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
);

type ActiveTab = 'contact' | 'location';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<ActiveTab>('contact');
  const [copied, setCopied] = useState('');

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
  };

  const inputStyles = "mt-1 block w-full px-4 py-3 bg-[#FAF3DD] text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/80 focus:border-teal-500 placeholder:text-gray-500 placeholder:italic transition-all duration-300";
  const submitButtonStyles = "w-full py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transform transition-all";

  const renderTabContent = () => {
    return (
        <div className="relative overflow-hidden min-h-[280px] md:min-h-[250px]">
            {/* Contact Details Content */}
            <div className={`transition-opacity duration-500 ease-in-out absolute w-full ${activeTab === 'contact' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <ul className="space-y-4 text-left">
                    <li className="font-bold text-xl text-white">Travelville Agency</li>
                    <li className="flex items-center">
                        <PhoneIcon />
                        <a href="tel:+12345678901" className="hover:text-teal-200">+1 234-567-8901</a>
                        <button onClick={() => handleCopy('+12345678901', 'phone')} className="ml-4 p-1.5 bg-teal-500 rounded-md hover:bg-teal-400 text-white">
                            {copied === 'phone' ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </li>
                    <li className="flex items-center">
                        <EmailIcon />
                        <a href="mailto:contact@travelville.com" className="hover:text-teal-200">contact@travelville.com</a>
                         <button onClick={() => handleCopy('contact@travelville.com', 'email')} className="ml-4 p-1.5 bg-teal-500 rounded-md hover:bg-teal-400 text-white">
                            {copied === 'email' ? <CheckIcon /> : <CopyIcon />}
                        </button>
                    </li>
                </ul>
            </div>

            {/* Location Content */}
            <div className={`transition-opacity duration-500 ease-in-out absolute w-full ${activeTab === 'location' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="space-y-4 text-left">
                    <div className="flex items-start">
                        <MapPinIcon />
                        <div>
                            <p className="font-semibold">Office Address:</p>
                            <p>555 Beach Rd, Suite 33, Miami FL, 55555</p>
                        </div>
                    </div>
                    <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden border-2 border-teal-500">
                       <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.39832205566!2d-80.21004126760113!3d25.782545398282304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b434c4463661%3A0x1b1be1d355818955!2sMiami%20Beach%2C%20FL%2C%20USA!5e0!3m2!1sen!2sin!4v1678886000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location Map"
                        ></iframe>
                    </div>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=555+Beach+Rd+Miami+FL" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-2 px-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition">
                        Get Directions
                    </a>
                </div>
            </div>
        </div>
    );
  }

  return (
    <section 
      id="contact" 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-white animate-on-scroll ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-teal-600 text-white p-8 rounded-lg shadow-2xl">
            <div className="text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h5 className="text-2xl font-bold">Contact Us For Booking</h5>
              <p className="mt-2 text-teal-100 max-w-md mx-auto">
                Ready to book or have questions? Use the details below or fill out the form. Our experts are here to help.
              </p>
            </div>

            <div className="bg-teal-700/50 rounded-lg p-1.5 mb-4 flex">
                 <button 
                    onClick={() => setActiveTab('contact')}
                    className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'contact' ? 'bg-white text-teal-700 shadow' : 'text-white hover:bg-teal-600/50'}`}
                >
                    📞 Contact Details
                </button>
                <button 
                    onClick={() => setActiveTab('location')}
                    className={`w-1/2 py-2 rounded-md font-semibold transition-colors duration-300 ${activeTab === 'location' ? 'bg-white text-teal-700 shadow' : 'text-white hover:bg-teal-600/50'}`}
                >
                    📍 Location
                </button>
            </div>

            {renderTabContent()}

          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h5 className="text-2xl font-bold mb-6 text-gray-800">Please fill out this form</h5>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" required className={inputStyles} placeholder="Your Full Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" required className={inputStyles} placeholder="your.email@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" id="phone" name="phone" className={inputStyles} placeholder="Your Phone Number (Optional)" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} required className={inputStyles} placeholder="Tell us about your travel plans..."></textarea>
              </div>
              <div>
                <button type="submit" className={submitButtonStyles}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;