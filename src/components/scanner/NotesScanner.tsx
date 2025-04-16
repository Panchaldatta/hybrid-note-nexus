
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, RotateCw, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NotesScannerProps {
  onProcessed: () => void;
}

const NotesScanner = ({ onProcessed }: NotesScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access camera. Please check permissions."
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreamActive(false);
    }
  };

  const handleCapture = async () => {
    if (!streamActive) {
      await startCamera();
      return;
    }
    
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        stopCamera();
        processImage();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      processImage();
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      onProcessed();
      toast({
        title: "Processing complete",
        description: "Your notes have been processed successfully"
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      {!capturedImage ? (
        <div className="w-full space-y-6">
          {streamActive ? (
            <div className="relative rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                className="w-full" 
                playsInline
                muted
              />
              <Button 
                onClick={handleCapture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleCapture} className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </Button>
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="w-full">
          <div className="relative">
            <img 
              src={capturedImage} 
              alt="Captured notes" 
              className="w-full rounded-lg"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center">
                  <RotateCw className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p>Processing image...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesScanner;
