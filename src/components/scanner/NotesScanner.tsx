
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, RotateCw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const NotesScanner = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      console.error("Error accessing camera:", error);
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
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current frame from video to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        
        // Stop the camera stream
        stopCamera();
        
        toast({
          title: "Image captured",
          description: "You can now process the image or take another one."
        });
      }
    }
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      setIsProcessed(false);
      
      toast({
        title: "Image uploaded",
        description: `File: ${file.name}`
      });
    }
  };

  const processImage = () => {
    setIsProcessing(true);
    
    // Simulate OCR processing with a timeout
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
      
      toast({
        title: "Processing complete",
        description: "Your notes have been successfully processed."
      });
    }, 2000);
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setIsProcessed(false);
    stopCamera();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {!capturedImage ? (
          <div className="flex flex-col items-center">
            <div className="bg-muted rounded-lg p-8 w-full max-w-md mb-6 flex flex-col items-center justify-center min-h-[300px] relative">
              {streamActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    className="w-full h-full rounded-lg" 
                    playsInline
                    muted
                  />
                  <Button 
                    onClick={handleCapture}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Capture
                  </Button>
                </>
              ) : (
                <>
                  <Camera className="h-24 w-24 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Capture or upload handwritten notes to convert them to digital text
                  </p>
                </>
              )}
              {/* Hidden canvas for capturing images */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCapture} className="gap-2">
                <Camera className="h-4 w-4" />
                {streamActive ? "Take Photo" : "Capture with Camera"}
              </Button>
              <Button variant="outline" onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md mb-6">
              <img 
                src={capturedImage} 
                alt="Captured notes" 
                className="w-full h-auto rounded-lg shadow-md"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                  <div className="flex flex-col items-center">
                    <RotateCw className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p>Processing image...</p>
                  </div>
                </div>
              )}
              {isProcessed && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              {!isProcessed ? (
                <>
                  <Button onClick={processImage} className="gap-2" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Process Image
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetScanner} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="default" className="gap-2">
                    <Check className="h-4 w-4" />
                    Use Processed Notes
                  </Button>
                  <Button variant="outline" onClick={resetScanner} className="gap-2">
                    <X className="h-4 w-4" />
                    Start Over
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotesScanner;
