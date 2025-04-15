
// Note: This is a mock implementation for frontend use
// In a real application, you would use an API to communicate with MongoDB

export interface Note {
  id: string;
  title: string;
  date: string;
  type: 'audio' | 'scan' | 'hybrid';
  excerpt: string;
  content?: string;
  audioUrl?: string;
  imageUrls?: string[];
}

// Mock data that simulates what would come from MongoDB
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Quantum Mechanics Lecture",
    date: "April 15, 2025",
    type: "audio",
    excerpt: "Wave-particle duality and the double-slit experiment..."
  },
  {
    id: "2",
    title: "Calculus Notes",
    date: "April 14, 2025",
    type: "scan",
    excerpt: "Integration by parts and applications..."
  },
  {
    id: "3",
    title: "History of Computing",
    date: "April 10, 2025",
    type: "hybrid",
    excerpt: "The evolution of computers from vacuum tubes to..."
  }
];

export const getNotes = async (): Promise<Note[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockNotes];
};

export const addNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const newNote = {
    ...note,
    id: Math.random().toString(36).substring(2, 15),
  };
  
  mockNotes.push(newNote);
  return newNote;
};
