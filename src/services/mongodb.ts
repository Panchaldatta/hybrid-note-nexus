
// Real implementation for communicating with MongoDB via API
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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

// Fetch all notes from the API
export const getNotes = async (): Promise<Note[]> => {
  try {
    console.log("Fetching notes from API...");
    const response = await axios.get(`${API_URL}/notes`);
    
    // Transform MongoDB _id to id for frontend compatibility
    const notes = response.data.map((note: any) => ({
      id: note._id,
      title: note.title,
      date: note.date,
      type: note.type,
      excerpt: note.excerpt,
      content: note.content,
      audioUrl: note.audioUrl,
      imageUrls: note.imageUrls,
    }));
    
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Add a new note
export const addNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  try {
    console.log("Adding note via API:", note);
    const response = await axios.post(`${API_URL}/notes`, note);
    
    // Transform MongoDB _id to id for frontend compatibility
    return {
      id: response.data._id,
      title: response.data.title,
      date: response.data.date,
      type: response.data.type,
      excerpt: response.data.excerpt,
      content: response.data.content,
      audioUrl: response.data.audioUrl,
      imageUrls: response.data.imageUrls,
    };
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

// Get a note by ID
export const getNoteById = async (id: string): Promise<Note | undefined> => {
  try {
    console.log("Fetching note by ID from API:", id);
    const response = await axios.get(`${API_URL}/notes/${id}`);
    
    if (!response.data) {
      return undefined;
    }
    
    // Transform MongoDB _id to id for frontend compatibility
    return {
      id: response.data._id,
      title: response.data.title,
      date: response.data.date,
      type: response.data.type,
      excerpt: response.data.excerpt,
      content: response.data.content,
      audioUrl: response.data.audioUrl,
      imageUrls: response.data.imageUrls,
    };
  } catch (error) {
    console.error("Error fetching note by ID:", error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined;
    }
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id: string): Promise<boolean> => {
  try {
    console.log("Deleting note via API:", id);
    await axios.delete(`${API_URL}/notes/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
};

// Save audio recording
export const saveAudioRecording = async (audioData: string, duration: number): Promise<AudioNote> => {
  try {
    console.log("Saving audio recording via API...");
    
    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = `Audio Recording - ${new Date().toLocaleString()}`;
    
    const response = await axios.post(`${API_URL}/audio/save-base64`, {
      audioData,
      duration,
      title,
      date: formattedDate
    });
    
    return {
      id: response.data.id,
      title: response.data.title,
      date: response.data.date,
      audioData,
      duration
    };
  } catch (error) {
    console.error("Error saving audio recording:", error);
    throw error;
  }
};

// Save audio recording with note
export const saveAudioWithNote = async (
  audioData: string, 
  duration: number, 
  title: string, 
  transcript?: string
): Promise<{ note: Note, recording: any }> => {
  try {
    console.log("Saving audio with note via API...");
    
    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const response = await axios.post(`${API_URL}/audio/save-with-note`, {
      audioData,
      duration,
      title,
      date: formattedDate,
      transcript
    });
    
    // Transform MongoDB _id to id for frontend compatibility
    const note = {
      id: response.data.note._id,
      title: response.data.note.title,
      date: response.data.note.date,
      type: response.data.note.type,
      excerpt: response.data.note.excerpt,
      content: response.data.note.content,
      audioUrl: response.data.note.audioUrl,
      imageUrls: response.data.note.imageUrls,
    };
    
    return { note, recording: response.data.recording };
  } catch (error) {
    console.error("Error saving audio with note:", error);
    throw error;
  }
};

// Upload images for scanned notes
export const uploadImages = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const response = await axios.post(`${API_URL}/notes/upload-images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

// Generate transcript from audio (mock for now)
export const generateTranscript = async (audioId: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/audio/generate-transcript/${audioId}`);
    return response.data.transcript;
  } catch (error) {
    console.error("Error generating transcript:", error);
    throw error;
  }
};
