
import NotesScanner from "@/components/scanner/NotesScanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, GitMerge } from "lucide-react";

const ScannerPage = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Note Scanner</h1>
      <p className="text-muted-foreground mb-8">
        Scan handwritten notes or upload images to convert them into digital, searchable text.
      </p>
      
      <Tabs defaultValue="scan" className="w-full">
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
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Drag and drop image files here, or click to select files
                </p>
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
                  </div>
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-2">Select Scanned Notes</h3>
                    <p className="text-sm text-muted-foreground">No scanned notes selected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScannerPage;
