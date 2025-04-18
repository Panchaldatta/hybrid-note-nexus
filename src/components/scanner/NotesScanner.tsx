
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface NotesScannerProps {
  onProcessed: (imageUrl: string) => void;
}

const NotesScanner = ({ onProcessed }: NotesScannerProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      onProcessed(imageUrl);
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
          <div className="rounded-lg border-2 border-dashed border-muted-foreground p-8 text-center space-y-6">
            <div className="flex flex-col items-center">
              <Upload className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Upload Your Notes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload an image of your written notes
              </p>
            </div>
            <Button 
              variant="default" 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-sm mx-auto"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
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
              alt="Uploaded notes" 
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
                Upload Another
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
