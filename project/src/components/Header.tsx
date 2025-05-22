import React from 'react';
import { Music } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center justify-center md:justify-start">
        <Music className="h-8 w-8 text-indigo-400 mr-2" />
        <h1 className="text-3xl font-bold text-white">Virtual Piano</h1>
      </div>
      <p className="text-center md:text-left mt-2 text-gray-300">
        Click on the keys or use your keyboard to play beautiful melodies
      </p>
    </header>
  );
};

export default Header;