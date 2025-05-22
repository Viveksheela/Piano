import React from 'react';
import Piano from './components/Piano';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      <Header />
      <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center flex-grow">
        <Piano />
      </main>
      <footer className="w-full text-center py-4 text-gray-400 text-sm">
        <p>Created with ♪ and ♥ in 2025</p>
      </footer>
    </div>
  );
}

export default App;