
import { useState } from "react";
import NotesScanner from "@/components/scanner/NotesScanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, GitMerge, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addNote } from "@/services/mongodb";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ScannerPage = () => {
  const [activeTab, setActiveTab] = useState("scan");
  const [hasProcessedImage, setHasProcessedImage] = useState(false);
  const navigate = useNavigate();

  const handleSaveNote = async () => {
    try {
      // Generate current date in format "Month Day, Year"
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      // Create a new note object
      const newNote = {
        title: "Scanned Notes",
        date: formattedDate,
        type: 'scan' as const,
        excerpt: "Scanned handwritten notes converted to digital text...",
      };
      
      await addNote(newNote);
      
      toast({
        title: "Scanned note saved",
        description: "Your scanned note has been saved successfully"
      });
      
      // Navigate to the notes page
      navigate('/notes');
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "There was a problem saving your note. Please try again."
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Note Scanner</h1>
        {hasProcessedImage && (
          <Button onClick={handleSaveNote} className="gap-2">
            <Save className="h-4 w-4" />
            Save Note
          </Button>
        )}
      </div>
      
      <p className="text-muted-foreground mb-8">
        Scan handwritten notes or upload images to convert them into digital, searchable text.
      </p>
      
      <Tabs defaultValue="scan" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="scan" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Scan Notes
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Image
          </TabsTrigger>
          <TabsTrigger value="merge" className="flex items-center gap-2">
            <GitMerge className="h-4 w-4" />
            Merge with Transcript
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scan">
          <NotesScanner />
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Images</CardTitle>
              <CardDescription>
                Select image files from your device to convert to digital notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-12 text-center">
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Drag and drop image files here, or click to select files
                  </p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        // Handle file upload
                        toast({
                          title: "Image uploaded",
                          description: `File: ${e.target.files[0].name}`
                        });
                        setHasProcessedImage(true);
                      }
                    }}
                  />
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="merge">
          <Card>
            <CardHeader>
              <CardTitle>Merge with Transcript</CardTitle>
              <CardDescription>
                Combine scanned notes with audio transcripts to create hybrid notes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-8 text-center bg-muted/50">
                <p className="text-muted-foreground mb-4">
                  First, create or select a transcript and scanned notes to merge.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Select Transcript</h3>
                    <p className="text-sm text-muted-foreground">No transcripts selected</p>
                    <Button variant="outline" size="sm" className="mt-2">Select Transcript</Button>
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Select Scanned Notes</h3>
                    <p className="text-sm text-muted-foreground">No scanned notes selected</p>
                    <Button variant="outline" size="sm" className="mt-2">Select Scanned Notes</Button>
                  </div>
                </div>
                <Button className="mt-6" disabled>Create Hybrid Note</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScannerPage;
