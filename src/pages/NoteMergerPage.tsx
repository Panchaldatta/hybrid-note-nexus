
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { Download, Share2, Save, ArrowRight, ArrowLeft, Pin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { addNote } from "@/services/mongodb";
import { useNavigate } from "react-router-dom";

const NoteMergerPage = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [title, setTitle] = useState("Hybrid Note");
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();
  
  const handleSaveDraft = () => {
    setIsDirty(true);
    toast({
      title: "Draft saved",
      description: "Your hybrid note draft has been saved"
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Exporting document",
      description: "Your hybrid note is being prepared for export"
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: "Your hybrid note has been exported successfully"
      });
    }, 1500);
  };
  
  const handleShare = () => {
    if (!navigator.share) {
      toast({
        title: "Sharing not supported",
        description: "Web Share API is not supported in your browser"
      });
      return;
    }
    
    navigator.share({
      title: "Shared Note",
      text: "Check out my hybrid note from NoteFusion!",
      url: window.location.href,
    })
    .then(() => {
      toast({
        title: "Shared successfully",
        description: "Your note has been shared"
      });
    })
    .catch((error) => {
      console.error("Error sharing:", error);
      toast({
        variant: "destructive",
        title: "Sharing failed",
        description: "There was an error sharing your note"
      });
    });
  };
  
  const handlePinToTranscript = () => {
    toast({
      title: "Image pinned",
      description: "Image has been pinned to the current transcript position"
    });
  };
  
  const handleFinishMerge = async () => {
    try {
      // Generate current date in format "Month Day, Year"
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      // Create a new hybrid note
      const newNote = {
        title,
        date: formattedDate,
        type: 'hybrid' as const,
        excerpt: "Combined audio transcript with handwritten notes...",
      };
      
      await addNote(newNote);
      
      toast({
        title: "Hybrid note created",
        description: "Your hybrid note has been saved successfully"
      });
      
      // Navigate to the notes page
      navigate('/notes');
    } catch (error) {
      console.error("Error creating hybrid note:", error);
      toast({
        variant: "destructive",
        title: "Error saving note",
        description: "There was a problem saving your hybrid note. Please try again."
      });
    }
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Note Merger</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleSaveDraft}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Merge audio transcripts with scanned notes to create comprehensive study materials.
      </p>
      
      <Tabs defaultValue="editor" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Audio Transcript</h2>
              <Card>
                <CardContent className="p-0">
                  <TranscriptViewer />
                </CardContent>
              </Card>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Section
                </Button>
                <Button variant="outline" className="gap-2">
                  Next Section
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Scanned Notes</h2>
              <Card className="border-2 border-dashed">
                <CardContent className="p-6 min-h-[300px] flex flex-col items-center justify-center">
                  <div className="relative w-full">
                    <img 
                      src="/placeholder.svg"
                      alt="Scanned notes"
                      className="w-full h-auto rounded-md shadow-sm"
                    />
                    <Button 
                      size="sm" 
                      className="absolute top-4 right-4"
                      variant="secondary"
                      onClick={handlePinToTranscript}
                    >
                      <Pin className="h-4 w-4 mr-1" />
                      Pin to Transcript
                    </Button>
                  </div>
                  <div className="mt-4 flex justify-between w-full">
                    <Button variant="outline" className="gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Previous Page
                    </Button>
                    <span className="flex items-center text-muted-foreground">Page 1 of 3</span>
                    <Button variant="outline" className="gap-2">
                      Next Page
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={handleFinishMerge}>
              Finish & Save Hybrid Note
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Quantum Mechanics Lecture</h2>
              <div className="bg-muted p-4 rounded-md mb-6">
                <p className="italic text-muted-foreground">
                  Combined notes from audio transcript and handwritten notes - April 15, 2025
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold">Professor:</p>
                  <p>Welcome to today's lecture on quantum mechanics. We'll be covering the basics of wave-particle duality.</p>
                </div>
                
                <div className="border-2 p-4 rounded-md bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">Handwritten note linked here:</p>
                  <img 
                    src="/placeholder.svg"
                    alt="Handwritten note about wave-particle duality"
                    className="max-w-md mx-auto rounded-md shadow-sm"
                  />
                </div>
                
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold">Professor:</p>
                  <p>The concept was first introduced by Louis de Broglie in 1924. He proposed that all matter has wave-like properties.</p>
                </div>
                
                <div className="border-l-4 border-secondary pl-4 py-2">
                  <p className="font-semibold">Student 1:</p>
                  <p>Can you explain how this relates to the double-slit experiment?</p>
                </div>
                
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold">Professor:</p>
                  <p>Great question. The double-slit experiment demonstrates this duality. When electrons are sent through two slits, they create an interference pattern on the detector screen, which is a characteristic of waves.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NoteMergerPage;
