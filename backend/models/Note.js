
const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['audio', 'scan'],
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  audioUrl: {
    type: String
  },
  imageUrls: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', NoteSchema);
