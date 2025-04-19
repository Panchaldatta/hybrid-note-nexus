
# Study Notes App - Full Stack Project

A full-featured note-taking application with audio recording and scanning capabilities.

## Features

- Record audio and save as notes
- Generate transcripts from audio recordings
- Upload and process scanned notes
- Full CRUD operations for notes
- MongoDB database integration
- RESTful API backend

## Project Structure

```
.
├── backend/                # Backend code
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files storage
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
│
├── src/                    # Frontend code (React)
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API services
│   └── ...
│
├── package.json            # Frontend dependencies
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas connection)

### Setting up the Backend

1. Navigate to the backend directory:

```sh
cd backend
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the backend directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/study_notes_app
PORT=5000
```

Replace the MongoDB URI with your own if using MongoDB Atlas.

4. Start the backend server:

```sh
npm run dev
```

The server will run on http://localhost:5000

### Setting up the Frontend

1. In the project root, install frontend dependencies:

```sh
npm install
```

2. Add axios as a dependency:

```sh
npm install axios
```

3. Start the frontend development server:

```sh
npm run dev
```

The frontend will run on http://localhost:5173

## API Documentation

### Notes API

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/notes` | GET | Get all notes | - | Array of Note objects |
| `/api/notes/:id` | GET | Get a note by ID | - | Note object |
| `/api/notes` | POST | Create a new note | Note object | Created Note object |
| `/api/notes/:id` | PUT | Update a note | Updated Note object | Updated Note object |
| `/api/notes/:id` | DELETE | Delete a note | - | Success message |
| `/api/notes/upload-images` | POST | Upload images for scanned notes | Form data with images | Array of image URLs |

### Audio API

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/audio` | GET | Get all audio recordings | - | Array of AudioRecording objects |
| `/api/audio/:id` | GET | Get an audio recording by ID | - | AudioRecording object |
| `/api/audio/upload` | POST | Upload an audio file | Form data with audio file | Audio URL |
| `/api/audio/save-base64` | POST | Save audio recording with base64 data | { title, date, audioData, duration } | Saved AudioRecording object |
| `/api/audio/generate-transcript/:id` | POST | Generate transcript from audio | - | { transcript } |
| `/api/audio/save-with-note` | POST | Save audio with associated note | { title, date, audioData, duration, transcript } | { note, recording } |

## Data Models

### Note

```typescript
{
  id: string;
  title: string;
  date: string;
  type: 'audio' | 'scan';
  excerpt: string;
  content?: string;
  audioUrl?: string;
  imageUrls?: string[];
}
```

### AudioRecording

```typescript
{
  id: string;
  title: string;
  date: string;
  filename: string;
  duration: number;
  transcript?: string;
  noteId?: string;
}
```

## Frontend-Backend Integration

The frontend uses axios to communicate with the backend. The API service is implemented in `src/services/mongodb.ts`.

## Deployment

### Backend Deployment

1. Set up a MongoDB database on MongoDB Atlas
2. Deploy the backend to a hosting service like Heroku, Render, or Railway
3. Set the environment variables on your hosting platform

### Frontend Deployment

1. Build the frontend:

```sh
npm run build
```

2. Deploy the built files to a static hosting service like Vercel, Netlify, or GitHub Pages

## License

This project is licensed under the MIT License.
