
import AudioRecorder from "@/components/recorder/AudioRecorder";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { useState } from "react";

const RecorderPage = () => {
  const [hasRecording, setHasRecording] = useState(false);
  
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Audio Recorder</h1>
      <p className="text-muted-foreground mb-8">
        Record lectures or upload audio files to generate transcripts with speaker labels.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <AudioRecorder />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Transcript</h2>
          <TranscriptViewer />
        </div>
      </div>
    </div>
  );
};

export default RecorderPage;
