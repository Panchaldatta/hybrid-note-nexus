
import { useState, useEffect } from "react";
import AudioRecorder from "@/components/recorder/AudioRecorder";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { addNote } from "@/services/mongodb";
import { useNavigate } from "react-router-dom";

const RecorderPage = () => {
  const [hasRecording, setHasRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [title, setTitle] = useState("New Audio Recording");
  const navigate = useNavigate();
  
  const handleTranscriptGenerated = (text: string) => {
    setTranscript(text);
    setHasRecording(true);
  };
  
  const saveNote = async () => {
    try {
      // Generate current date in format "Month Day, Year"
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      // Create a new note object
      const newNote = {
        title,
        date: formattedDate,
        type: 'audio' as const,
        excerpt: transcript ? transcript.substring(0, 100) + "..." : "Audio recording",
        content: transcript || undefined
      };
      
      await addNote(newNote);
      
      toast({
        title: "Note saved successfully",
        description: "Your audio note has been saved"
      });
      
      // Navigate to the notes page
      navigate('/notes');
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "There was a problem saving your note. Please try again."
      });
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audio Recorder</h1>
        {hasRecording && (
          <Button onClick={saveNote} className="gap-2">
            <Save className="h-4 w-4" />
            Save Note
          </Button>
        )}
      </div>
      
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
