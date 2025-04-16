
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Upload, RotateCw, Check, ScanLine } from "lucide-react";
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
  const [cameraError, setCameraError] = useState(false);
  
  useEffect(() => {
    // Clean up function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);
  
  const startCamera = async () => {
    try {
      setCameraError(false);
      
      // First stop any existing stream
      stopCamera();
      
      // Then start a new stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreamActive(true);
        toast({
          title: "Camera activated",
          description: "Position your notes in the frame and tap capture"
        });
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(true);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access camera. Please check permissions or try uploading an image instead."
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
    
    // Simulate processing with a longer time to seem more realistic
    setTimeout(() => {
      setIsProcessing(false);
      onProcessed();
      toast({
        title: "Processing complete",
        description: "Your notes have been processed successfully",
        action: <Check className="h-4 w-4 text-green-500" />
      });
    }, 2500);
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
                className="w-full h-full" 
                playsInline
                autoPlay
                muted
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full flex items-center justify-center">
                  <ScanLine className="h-16 w-16 text-primary animate-pulse opacity-80" />
                </div>
              </div>
              <Button 
                onClick={handleCapture}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-muted-foreground p-8 text-center space-y-6">
              <div className="flex flex-col items-center">
                <ScanLine className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Scan Your Notes</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use your camera to capture notes or upload an image
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={startCamera} 
                  className="w-full"
                  disabled={cameraError}
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
              {cameraError && (
                <p className="text-sm text-destructive">
                  Camera access failed. Please check your permissions or use the upload option.
                </p>
              )}
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
                  <RotateCw className="h-8 w-8 animate-spin text-primary mb-2" />
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesScanner;
