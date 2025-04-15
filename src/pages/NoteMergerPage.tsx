
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { Download, Share2, Save, ArrowRight, ArrowLeft, Pin } from "lucide-react";

const NoteMergerPage = () => {
  const [activeTab, setActiveTab] = useState("editor");
  
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Note Merger</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Merge audio transcripts with scanned notes to create comprehensive study materials.
      </p>
      
      <Tabs defaultValue="editor" onValueChange={setActiveTab}>
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
