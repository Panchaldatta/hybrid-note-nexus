
import { MongoClient } from 'mongodb';

const uri = "YOUR_MONGODB_CONNECTION_STRING"; // Replace with your MongoDB Atlas connection string
const client = new MongoClient(uri);

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

export const getNotes = async () => {
  try {
    await client.connect();
    const database = client.db('notefusion');
    const notes = database.collection('notes');
    return await notes.find({}).toArray();
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

export const addNote = async (note: Omit<Note, 'id'>) => {
  try {
    await client.connect();
    const database = client.db('notefusion');
    const notes = database.collection('notes');
    const result = await notes.insertOne({ ...note, id: crypto.randomUUID() });
    return result;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

