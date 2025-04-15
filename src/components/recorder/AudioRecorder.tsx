
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Upload, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartRecording = () => {
    setIsRecording(true);
    // In a real app, we would start recording here
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
    
    // For demo purposes, stop after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
      setIsRecording(false);
      setAudioSrc("https://example.com/placeholder-audio.mp3");
    }, 10000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // In a real app, we would stop recording here
  };

  const handleUploadAudio = () => {
    // In a real app, we would trigger a file upload here
    setTimeout(() => {
      setAudioSrc("https://example.com/placeholder-audio.mp3");
    }, 1000);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="p-6 flex flex-col items-center">
      <div className="mb-6 flex flex-col items-center">
        <div 
          className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-colors",
            isRecording ? "bg-red-500 animate-pulse" : "bg-primary"
          )}
        >
          <Mic className="h-12 w-12 text-white" />
        </div>
        <div className="text-3xl font-mono">{formatTime(recordingTime)}</div>
      </div>

      <div className="flex gap-4 mb-6">
        {!isRecording ? (
          <Button 
            onClick={handleStartRecording} 
            variant="default" 
            size="lg" 
            className="gap-2"
          >
            <Mic className="h-5 w-5" />
            Start Recording
          </Button>
        ) : (
          <Button 
            onClick={handleStopRecording} 
            variant="destructive" 
            size="lg"
            className="gap-2"  
          >
            <Square className="h-5 w-5" />
            Stop Recording
          </Button>
        )}
      </div>

      <div className="text-center text-muted-foreground">
        <p className="mb-4">or upload an audio file</p>
        <Button 
          variant="outline" 
          onClick={handleUploadAudio}
          className="gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Audio
        </Button>
      </div>

      {audioSrc && (
        <div className="mt-8 w-full">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: isPlaying ? "45%" : "0%" }}
              />
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AudioRecorder;
