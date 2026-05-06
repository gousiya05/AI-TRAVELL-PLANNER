
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-800 text-white text-center py-6">
      <p className="text-lg">Travel © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
