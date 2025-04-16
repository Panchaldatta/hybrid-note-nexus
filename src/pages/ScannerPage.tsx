
import { useState } from "react";
import NotesScanner from "@/components/scanner/NotesScanner";
import { Button } from "@/components/ui/button";
import { ScanText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { addNote } from "@/services/mongodb";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const ScannerPage = () => {
  const [hasProcessedImage, setHasProcessedImage] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Scanned Notes");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

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
      });
      
      toast({
        title: "Note saved successfully",
        description: "Your scanned note has been saved to your library"
      });
      
      // After a short delay, navigate to the notes page
      setTimeout(() => {
        navigate('/notes');
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
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
          <NotesScanner 
            onProcessed={() => setHasProcessedImage(true)}
          />
          
          {hasProcessedImage && (
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="note-title" className="text-sm font-medium">
                  Note Title
                </label>
                <Input
                  id="note-title"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="max-w-md"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveNote} 
                  disabled={isSaving}
                  className="min-w-[120px]"
                >
                  {isSaving ? "Saving..." : "Save Note"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScannerPage;
