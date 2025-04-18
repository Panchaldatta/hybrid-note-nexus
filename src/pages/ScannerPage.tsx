
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotesScanner from "@/components/scanner/NotesScanner";
import { Button } from "@/components/ui/button";
import { ScanText, Save, ImagePlus, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { addNote } from "@/services/mongodb";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ScannerPage = () => {
  const [hasProcessedImage, setHasProcessedImage] = useState(false);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState("Scanned Notes");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleProcessed = (imageUrl: string) => {
    setHasProcessedImage(true);
    setCapturedImageUrl(imageUrl);
    toast.success("Image captured! Add a title and save to your notes.");
  };

  const handleSaveNote = async () => {
    try {
      setIsSaving(true);
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      await addNote({
        title: noteTitle,
        date: formattedDate,
        type: 'scan',
        excerpt: "Scanned handwritten notes",
        imageUrls: capturedImageUrl ? [capturedImageUrl] : undefined
      });
      
      toast.success("Note saved successfully!");
      
      // After a short delay, navigate to the notes page
      setTimeout(() => {
        navigate('/notes');
      }, 1000);
    } catch (error) {
      toast.error("Failed to save note. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setHasProcessedImage(false);
    setCapturedImageUrl(null);
    setNoteTitle("Scanned Notes");
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <ScanText className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Note Scanner</h1>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {hasProcessedImage ? (
            <div className="space-y-6">
              {capturedImageUrl && (
                <div className="rounded-lg overflow-hidden border">
                  <img 
                    src={capturedImageUrl} 
                    alt="Captured notes" 
                    className="w-full object-contain"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="note-title" className="text-sm font-medium">
                  Note Title
                </label>
                <Input
                  id="note-title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="max-w-md"
                  placeholder="Enter a title for your note"
                />
              </div>
            </div>
          ) : (
            <NotesScanner onProcessed={handleProcessed} />
          )}
        </CardContent>
        
        {hasProcessedImage && (
          <CardFooter className="flex justify-between px-6 pb-6 pt-0">
            <Button 
              variant="outline" 
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button 
              onClick={handleSaveNote} 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save to Notes
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ScannerPage;
