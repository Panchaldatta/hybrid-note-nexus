
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, RotateCw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NotesScanner = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const handleCapture = () => {
    // In a real app, this would trigger the camera
    setCapturedImage("/placeholder.svg");
  };

  const handleUpload = () => {
    // In a real app, this would open a file picker
    setCapturedImage("/placeholder.svg");
  };

  const processImage = () => {
    setIsProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 2000);
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setIsProcessed(false);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {!capturedImage ? (
          <div className="flex flex-col items-center">
            <div className="bg-muted rounded-lg p-8 w-full max-w-md mb-6 flex flex-col items-center justify-center min-h-[300px]">
              <Camera className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Capture or upload handwritten notes to convert them to digital text
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleCapture} className="gap-2">
                <Camera className="h-4 w-4" />
                Capture with Camera
              </Button>
              <Button variant="outline" onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
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
