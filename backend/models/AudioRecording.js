
const mongoose = require('mongoose');

const AudioRecordingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  transcript: {
    type: String
  },
  noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AudioRecording', AudioRecordingSchema);
