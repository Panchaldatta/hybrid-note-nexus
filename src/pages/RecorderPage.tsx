
import { useState, useEffect } from "react";
import AudioRecorder from "@/components/recorder/AudioRecorder";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { saveAudioWithNote } from "@/services/mongodb";
import { useNavigate } from "react-router-dom";

const RecorderPage = () => {
  const [hasRecording, setHasRecording] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [title, setTitle] = useState("New Audio Recording");
  const [audioData, setAudioData] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const handleRecordingComplete = (data: string, recordingDuration: number) => {
    setAudioData(data);
    setDuration(recordingDuration);
    setHasRecording(true);
  };
  
  const handleTranscriptGenerated = (text: string) => {
    setTranscript(text);
  };
  
  const saveNote = async () => {
    if (!audioData) {
      toast.error("No audio recording available");
      return;
    }
    
    try {
      setIsSaving(true);
      
      await saveAudioWithNote(audioData, duration, title, transcript || undefined);
      
      toast.success("Note saved successfully");
      setTimeout(() => {
        navigate('/notes');
      }, 1000);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Error saving note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audio Recorder</h1>
        {hasRecording && (
          <Button 
            onClick={saveNote} 
            className="gap-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Note
              </>
            )}
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-8">
        Record lectures or upload audio files to generate transcripts with speaker labels.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <AudioRecorder onRecordingComplete={handleRecordingComplete} />
          
          {hasRecording && (
            <div className="space-y-4">
              <div>
                <label htmlFor="note-title" className="block text-sm font-medium mb-1">
                  Note Title
                </label>
                <Input
                  id="note-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for your note"
                />
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Transcript</h2>
          <TranscriptViewer 
            onTranscriptGenerated={handleTranscriptGenerated} 
          />
        </div>
      </div>
    </div>
  );
};

export default RecorderPage;
