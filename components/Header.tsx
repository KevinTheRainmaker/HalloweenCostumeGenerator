
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-5xl md:text-7xl font-creepster text-orange-500 tracking-wider">
        Halloween AI Costume Generator
      </h1>
      <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">
        Upload a photo, choose a theme, and let AI create your perfect, spooky Halloween look.
      </p>
    </header>
  );
};
