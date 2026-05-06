
import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (anchor: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', text: 'Home' },
    { href: '#search', text: 'Search' },
    { href: '#popular', text: 'Popular' },
    { href: '#gallery', text: 'Gallery' },
    { href: '#contact', text: 'Contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const renderNavLinks = (isMobile: boolean = false) => (
    <ul className={isMobile ? 'flex flex-col items-center' : 'hidden md:flex space-x-2'}>
      {navLinks.map((link) => (
        <li key={link.href}>
          <a 
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="px-4 py-2 text-white hover:bg-teal-500 rounded-md transition duration-300 block text-center"
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header id="home" className="bg-teal-600 shadow-lg fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="text-2xl font-bold text-white">TravelLekt</a>
          <div className="hidden md:block">{renderNavLinks()}</div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-teal-600">
            {renderNavLinks(true)}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
