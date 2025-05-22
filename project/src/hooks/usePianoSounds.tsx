import { useCallback, useRef } from 'react';

// Utility function to get frequency for a note
const getFrequency = (note: string): number => {
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const octave = parseInt(note.slice(-1));
  const noteName = note.slice(0, -1);
  
  const noteIndex = notes.indexOf(noteName);
  if (noteIndex === -1) return 440; // Default to A4
  
  // A4 is 440Hz
  const a4Index = notes.indexOf('A') + (4 * 12);
  const noteAbsoluteIndex = noteIndex + (octave * 12);
  
  // Each semitone is a factor of 2^(1/12)
  return 440 * Math.pow(2, (noteAbsoluteIndex - a4Index) / 12);
};

export const usePianoSounds = () => {
  // Create audio context lazily on first interaction
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeOscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  
  // Initialize audio context if needed
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = 0.5; // Default volume
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
    return audioContextRef.current;
  }, []);

  const setAudioVolume = useCallback((volume: number) => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, []);

  const playNote = useCallback((note: string) => {
    try {
      const audioContext = getAudioContext();
      
      // Create oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = 'sine'; // Piano-like sound
      oscillator.frequency.value = getFrequency(note);
      
      // Apply envelope for more piano-like sound
      const gainNode = audioContext.createGain();
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.1, audioContext.currentTime + 1.5);
      
      // Connect nodes
      oscillator.connect(gainNode);
      gainNode.connect(gainNodeRef.current!);
      
      // Start and store
      oscillator.start();
      activeOscillatorsRef.current.set(note, oscillator);
      
      // Schedule automatic stop
      setTimeout(() => {
        if (activeOscillatorsRef.current.has(note)) {
          stopNote(note);
        }
      }, 4000); // Auto-stop after 4 seconds
    } catch (error) {
      console.error('Error playing note:', error);
    }
  }, [getAudioContext]);

  const stopNote = useCallback((note: string) => {
    try {
      const oscillator = activeOscillatorsRef.current.get(note);
      if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        activeOscillatorsRef.current.delete(note);
      }
    } catch (error) {
      console.error('Error stopping note:', error);
    }
  }, []);

  return { playNote, stopNote, setAudioVolume };
};