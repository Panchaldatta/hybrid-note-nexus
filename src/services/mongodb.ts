// Note: This is a mock implementation for frontend use
// In a real application, you would use an API to communicate with MongoDB

export interface Note {
  id: string;
  title: string;
  date: string;
  type: 'audio' | 'scan';
  excerpt: string;
  content?: string;
  audioUrl?: string;
  imageUrls?: string[];
}

export interface AudioNote {
  id: string;
  title: string;
  date: string;
  audioData: string; // Base64 encoded audio data
  duration: number;
}

// Mock data that simulates what would come from MongoDB
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Quantum Mechanics Lecture",
    date: "April 15, 2025",
    type: "audio",
    excerpt: "Wave-particle duality and the double-slit experiment...",
    audioUrl: "https://example.com/audio/lecture1.mp3",
    content: "Full lecture content on quantum mechanics and its applications."
  },
  {
    id: "2",
    title: "Calculus Notes",
    date: "April 14, 2025",
    type: "scan",
    excerpt: "Integration by parts and applications...",
    imageUrls: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
      "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb"
    ]
  },
  {
    id: "3",
    title: "Machine Learning Seminar",
    date: "April 10, 2025",
    type: "audio",
    excerpt: "Introduction to neural networks and deep learning frameworks...",
    audioUrl: "https://example.com/audio/seminar2.mp3"
  },
  {
    id: "4",
    title: "Biology Study Notes",
    date: "April 8, 2025",
    type: "scan",
    excerpt: "Cell structure and function, mitosis and meiosis processes...",
    imageUrls: [
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f8"
    ]
  }
];

// Mock audio notes array (in a real app this would be in MongoDB)
const mockAudioNotes: AudioNote[] = [];

// Get all notes
export const getNotes = async (): Promise<Note[]> => {
  console.log("Fetching notes...");
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockNotes];
};

// Add a new note
export const addNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  console.log("Adding note:", note);
  
  // Generate a random ID (in a real app this would be handled by MongoDB)
  const newNote = {
    ...note,
    id: Math.random().toString(36).substring(2, 15),
  };
  
  // Add to mock database
  mockNotes.unshift(newNote); // Add to beginning of array
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return newNote;
};

// Get a note by ID
export const getNoteById = async (id: string): Promise<Note | undefined> => {
  console.log("Fetching note by ID:", id);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockNotes.find(note => note.id === id);
};

// Delete a note
export const deleteNote = async (id: string): Promise<boolean> => {
  console.log("Deleting note:", id);
  const initialLength = mockNotes.length;
  const index = mockNotes.findIndex(note => note.id === id);
  
  if (index !== -1) {
    mockNotes.splice(index, 1);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  }
  
  return false;
};

// Add new function to save audio recording
export const saveAudioRecording = async (audioData: string, duration: number): Promise<AudioNote> => {
  console.log("Saving audio recording...");
  
  const newAudioNote: AudioNote = {
    id: Math.random().toString(36).substring(2, 15),
    title: `Audio Recording - ${new Date().toLocaleString()}`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    audioData,
    duration,
  };
  
  // In a real app, this would be saved to MongoDB
  mockAudioNotes.push(newAudioNote);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return newAudioNote;
};
