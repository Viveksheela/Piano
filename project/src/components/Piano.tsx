import React, { useState, useEffect } from 'react';
import PianoKey from './PianoKey';
import VolumeControl from './VolumeControl';
import { usePianoSounds } from '../hooks/usePianoSounds';
import { getPianoNotes } from '../utils/notes';

const Piano: React.FC = () => {
  const [activeNotes, setActiveNotes] = useState<string[]>([]);
  const [volume, setVolume] = useState<number>(0.5);
  const { playNote, stopNote, setAudioVolume } = usePianoSounds();
  const notes = getPianoNotes();

  // Set volume whenever it changes
  useEffect(() => {
    setAudioVolume(volume);
  }, [volume, setAudioVolume]);

  // Handle keyboard events
  useEffect(() => {
    const keyMap: Record<string, string> = {
      'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4', 'f': 'F4',
      't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4',
      'k': 'C5', 'o': 'C#5', 'l': 'D5', 'p': 'D#5', ';': 'E5'
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note && !activeNotes.includes(note)) {
        setActiveNotes((prev) => [...prev, note]);
        playNote(note);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note) {
        setActiveNotes((prev) => prev.filter((n) => n !== note));
        stopNote(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeNotes, playNote, stopNote]);

  const handleNoteOn = (note: string) => {
    if (!activeNotes.includes(note)) {
      setActiveNotes((prev) => [...prev, note]);
      playNote(note);
    }
  };

  const handleNoteOff = (note: string) => {
    setActiveNotes((prev) => prev.filter((n) => n !== note));
    stopNote(note);
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      <div className="mb-8 w-full max-w-xs">
        <VolumeControl volume={volume} onChange={setVolume} />
      </div>
      
      <div className="relative w-full overflow-x-auto pb-8 px-4">
        <div className="piano-container flex justify-center min-w-max">
          <div className="relative inline-flex h-64 shadow-2xl rounded-b-lg">
            {notes.map((note) => (
              <PianoKey
                key={note.id}
                note={note}
                isActive={activeNotes.includes(note.id)}
                onNoteOn={() => handleNoteOn(note.id)}
                onNoteOff={() => handleNoteOff(note.id)}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-gray-300 text-center">
        <h3 className="text-xl font-medium mb-2">Keyboard Shortcuts</h3>
        <p className="mb-4">Use your keyboard to play the piano: A-S-D-F-G-H-J-K-L for white keys</p>
        <p>W-E-T-Y-U-O-P for black keys</p>
      </div>
    </div>
  );
};

export default Piano;