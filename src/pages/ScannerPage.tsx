
import { useState } from "react";
import NotesScanner from "@/components/scanner/NotesScanner";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { addNote } from "@/services/mongodb";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ScannerPage = () => {
  const [hasProcessedImage, setHasProcessedImage] = useState(false);
  const navigate = useNavigate();

  const handleSaveNote = async () => {
    try {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      await addNote({
        title: "Scanned Notes",
        date: formattedDate,
        type: 'scan',
        excerpt: "Scanned handwritten notes",
      });
      
      toast({
        title: "Note saved",
        description: "Your scanned note has been saved successfully"
      });
      
      navigate('/notes');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save note. Please try again."
      });
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Note Scanner</h1>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <NotesScanner 
            onProcessed={() => setHasProcessedImage(true)}
          />
          
          {hasProcessedImage && (
            <div className="mt-4 flex justify-end">
              <Button onClick={handleSaveNote}>Save Note</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScannerPage;
