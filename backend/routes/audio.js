
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const AudioRecording = require('../models/AudioRecording');
const Note = require('../models/Note');

// Configure multer for audio uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    // Accept only audio files
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
});

// Get all audio recordings
router.get('/', async (req, res) => {
  try {
    const recordings = await AudioRecording.find().sort({ createdAt: -1 });
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single audio recording
router.get('/:id', async (req, res) => {
  try {
    const recording = await AudioRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }
    res.json(recording);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload audio file
router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }
    
    const audioUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ audioUrl });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Save audio recording with base64 data
router.post('/save-base64', async (req, res) => {
  try {
    const { title, date, audioData, duration } = req.body;
    
    if (!audioData || !duration) {
      return res.status(400).json({ message: 'Audio data and duration are required' });
    }
    
    // Extract the base64 data from the data URL
    const base64Data = audioData.replace(/^data:audio\/\w+;base64,/, '');
    const filename = `${uuidv4()}.mp3`;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Write the file to disk
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    
    // Create a new audio recording record
    const recording = new AudioRecording({
      title,
      date,
      filename,
      duration
    });
    
    const savedRecording = await recording.save();
    
    // Return the audio URL
    const audioUrl = `/uploads/${filename}`;
    res.status(201).json({ 
      id: savedRecording._id,
      title: savedRecording.title,
      date: savedRecording.date,
      audioUrl,
      duration: savedRecording.duration
    });
  } catch (error) {
    console.error('Error saving audio recording:', error);
    res.status(400).json({ message: error.message });
  }
});

// Generate transcript from audio (mock implementation)
router.post('/generate-transcript/:id', async (req, res) => {
  try {
    const recording = await AudioRecording.findById(req.params.id);
    if (!recording) {
      return res.status(404).json({ message: 'Recording not found' });
    }
    
    // In a real implementation, this would use a speech-to-text service
    // For now, we'll just generate a mock transcript
    const mockTranscript = "This is a sample transcript that would be generated from the audio recording.";
    
    // Update the recording with the transcript
    recording.transcript = mockTranscript;
    await recording.save();
    
    res.json({ transcript: mockTranscript });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save audio recording with associated note
router.post('/save-with-note', async (req, res) => {
  try {
    const { title, date, audioData, duration, transcript } = req.body;
    
    if (!audioData || !duration) {
      return res.status(400).json({ message: 'Audio data and duration are required' });
    }
    
    // Extract the base64 data from the data URL
    const base64Data = audioData.replace(/^data:audio\/\w+;base64,/, '');
    const filename = `${uuidv4()}.mp3`;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    // Write the file to disk
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    
    // Create a new note
    const note = new Note({
      title,
      date,
      type: 'audio',
      excerpt: transcript ? transcript.substring(0, 100) + "..." : "Audio recording",
      content: transcript || "Audio recording without transcript",
      audioUrl: `/uploads/${filename}`
    });
    
    const savedNote = await note.save();
    
    // Create a new audio recording record
    const recording = new AudioRecording({
      title,
      date,
      filename,
      duration,
      transcript,
      noteId: savedNote._id
    });
    
    const savedRecording = await recording.save();
    
    res.status(201).json({ 
      note: savedNote,
      recording: {
        id: savedRecording._id,
        title: savedRecording.title,
        date: savedRecording.date,
        audioUrl: `/uploads/${filename}`,
        duration: savedRecording.duration,
        transcript: savedRecording.transcript
      }
    });
  } catch (error) {
    console.error('Error saving audio recording with note:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
