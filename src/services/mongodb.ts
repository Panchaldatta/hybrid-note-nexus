
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
  },
  {
    id: "4",
    title: "Organic Chemistry",
    date: "April 8, 2025",
    type: "audio",
    excerpt: "Functional groups and their reactions..."
  },
  {
    id: "5",
    title: "Linear Algebra",
    date: "April 5, 2025",
    type: "scan",
    excerpt: "Vector spaces and linear transformations..."
  },
];

export const getNotes = async (): Promise<Note[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockNotes];
};

export const addNote = async (note: Omit<Note, 'id'>): Promise<{ id: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newNote = {
    ...note,
    id: Math.random().toString(36).substring(2, 15),
  };
  
  // In a real app, this would be saved to the database
  mockNotes.push(newNote);
  
  return { id: newNote.id };
};
