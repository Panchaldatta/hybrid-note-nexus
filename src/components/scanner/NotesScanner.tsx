
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Check, ScanLine, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface NotesScannerProps {
  onProcessed: (imageUrl: string) => void;
}

const NotesScanner = ({ onProcessed }: NotesScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [streamActive, setStreamActive] = useState(false);
  
  const startCamera = async () => {
    try {
      // Stop any existing stream
      stopCamera();
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreamActive(true);
        toast.success("Camera activated");
      }
    } catch (error) {
      console.error("Camera error:", error);
      toast.error("Could not access camera. Please check permissions or try uploading an image.");
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

  const handleCapture = () => {
    if (!streamActive) {
      startCamera();
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
        processImage(imageDataUrl);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        setCapturedImage(imageDataUrl);
        processImage(imageDataUrl);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const processImage = (imageUrl: string) => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onProcessed(imageUrl); // Pass the image URL to the parent component
      toast.success("Image processed successfully");
    }, 1500);
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!capturedImage ? (
        <div className="w-full space-y-6">
          {streamActive ? (
            <div className="relative rounded-lg overflow-hidden border-2 border-primary">
              <video 
                ref={videoRef} 
                className="w-full h-64 object-cover" 
                playsInline
                autoPlay
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <ScanLine className="h-16 w-16 text-primary animate-pulse opacity-80" />
              </div>
              <Button 
                onClick={handleCapture}
                variant="default"
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                <Camera className="h-6 w-6 mr-2" />
                Take Picture
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-muted-foreground p-8 text-center space-y-6">
              <div className="flex flex-col items-center">
                <ScanLine className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Scan Your Notes</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Take a picture of your written notes or upload an image
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={startCamera} 
                  className="w-full"
                >
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
        <div className="w-full space-y-4">
          <div className="relative">
            <img 
              src={capturedImage} 
              alt="Captured notes" 
              className="w-full rounded-lg border shadow-sm"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center">
                  <div className="animate-spin text-primary mb-2 h-8 w-8 border-2 border-current border-t-transparent rounded-full"></div>
                  <p>Processing your notes...</p>
                </div>
              </div>
            )}
          </div>
          {!isProcessing && (
            <div className="flex justify-between">
              <Button variant="outline" onClick={resetScanner}>
                Retake
              </Button>
              <Button onClick={() => onProcessed(capturedImage)} className="bg-green-600 hover:bg-green-700">
                <ImagePlus className="h-4 w-4 mr-2" />
                Use This Image
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesScanner;
