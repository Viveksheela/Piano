import React from 'react';
import { NoteData } from '../utils/notes';

interface PianoKeyProps {
  note: NoteData;
  isActive: boolean;
  onNoteOn: () => void;
  onNoteOff: () => void;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, isActive, onNoteOn, onNoteOff }) => {
  const { id, type, label, keyboardKey } = note;
  
  // Determine if it's a white or black key
  const isBlackKey = type === 'black';
  
  // Base classes for white and black keys
  const whiteKeyClasses = `
    relative w-14 h-64 border border-gray-300 rounded-b-lg 
    flex flex-col justify-end items-center pb-4
    transition-all duration-100 select-none
    ${isActive ? 'bg-indigo-100' : 'bg-white'}
    ${isActive ? 'shadow-inner' : 'shadow-sm'}
  `;
  
  const blackKeyClasses = `
    absolute w-8 h-40 bg-gray-900 rounded-b-lg 
    flex flex-col justify-end items-center pb-2
    -ml-4 z-10 transition-all duration-100 select-none
    ${isActive ? 'bg-gray-700' : 'bg-gray-900'}
    ${isActive ? 'shadow-inner' : 'shadow-lg'}
  `;

  const handleMouseDown = () => {
    onNoteOn();
  };

  const handleMouseUp = () => {
    onNoteOff();
  };

  const handleMouseLeave = () => {
    if (isActive) {
      onNoteOff();
    }
  };

  if (isBlackKey) {
    return (
      <div
        className={blackKeyClasses}
        style={{ left: note.position }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <span className="text-white text-xs opacity-70 mt-auto">
          {keyboardKey?.toUpperCase()}
        </span>
        <span className="text-white text-xs mt-1">{label}</span>
      </div>
    );
  }

  return (
    <div
      className={whiteKeyClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <span className="text-gray-400 text-xs mt-auto">
        {keyboardKey?.toUpperCase()}
      </span>
      <span className="text-gray-700 text-sm mt-1">{label}</span>
    </div>
  );
};

export default PianoKey;