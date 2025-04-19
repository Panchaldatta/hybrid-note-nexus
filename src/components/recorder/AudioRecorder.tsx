
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Square, Upload, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AudioRecorderProps {
  onRecordingComplete?: (audioData: string, duration: number) => void;
}

const AudioRecorder = ({ onRecordingComplete }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });
      
      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mpeg" });
        
        // Convert blob to base64 for API submission
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          setAudioSrc(URL.createObjectURL(audioBlob));
          setAudioBlob(audioBlob);
          
          // Pass the audio data and duration to parent component
          if (onRecordingComplete) {
            onRecordingComplete(base64Audio, recordingTime);
          }
          
          toast.success("Recording completed");
        };
        
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast.success("Recording started");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast.success("Recording stopped");
    }
  };

  const handleUploadAudio = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const audioUrl = URL.createObjectURL(file);
        setAudioSrc(audioUrl);
        setAudioBlob(file);
        
        // Convert the file to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64Audio = reader.result as string;
          
          // Get audio duration
          const audio = new Audio();
          audio.src = audioUrl;
          audio.onloadedmetadata = () => {
            const duration = Math.round(audio.duration);
            setRecordingTime(duration);
            
            // Pass the audio data and duration to parent component
            if (onRecordingComplete) {
              onRecordingComplete(base64Audio, duration);
            }
          };
        };
        
        toast.success("Audio uploaded");
      }
    };
    
    input.click();
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        
        audioRef.current.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        
        audioRef.current.addEventListener("play", () => {
          setIsPlaying(true);
        });
        
        audioRef.current.addEventListener("pause", () => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.src = audioSrc;
      }
    }
  }, [audioSrc]);

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
            disabled={audioSrc !== null}
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
          disabled={isRecording || audioSrc !== null}
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
                className="h-full bg-primary transition-all" 
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
