export interface NoteData {
  id: string;
  label: string;
  type: 'white' | 'black';
  position?: string;
  keyboardKey?: string;
}

// Keyboard mapping for the piano keys
const keyboardMap: Record<string, string> = {
  'C4': 'a',
  'C#4': 'w',
  'D4': 's',
  'D#4': 'e',
  'E4': 'd',
  'F4': 'f',
  'F#4': 't',
  'G4': 'g',
  'G#4': 'y',
  'A4': 'h',
  'A#4': 'u',
  'B4': 'j',
  'C5': 'k',
  'C#5': 'o',
  'D5': 'l',
  'D#5': 'p',
  'E5': ';'
};

export const getPianoNotes = (): NoteData[] => {
  // Generate a two-octave piano (C4 to E5)
  const notes: NoteData[] = [];
  const allNoteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Add octave 4
  allNoteNames.forEach((noteName) => {
    const id = `${noteName}4`;
    notes.push({
      id,
      label: noteName,
      type: noteName.includes('#') ? 'black' : 'white',
      keyboardKey: keyboardMap[id]
    });
  });
  
  // Add part of octave 5 (C5 to E5)
  ['C', 'C#', 'D', 'D#', 'E'].forEach((noteName) => {
    const id = `${noteName}5`;
    notes.push({
      id,
      label: noteName,
      type: noteName.includes('#') ? 'black' : 'white',
      keyboardKey: keyboardMap[id]
    });
  });

  // Calculate positions for black keys
  let whiteKeyCount = 0;
  notes.forEach((note, index) => {
    if (note.type === 'white') {
      whiteKeyCount++;
    } else {
      // Position black keys between white keys
      note.position = `${(whiteKeyCount - 0.5) * 3.5}rem`;
    }
  });

  return notes;
};