
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Download, Share2, Bookmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpeakerSegment {
  speaker: string;
  text: string;
  timestamp: string;
}

interface TranscriptViewerProps {
  title?: string;
  transcript?: SpeakerSegment[];
  onTranscriptGenerated?: (text: string) => void;
}

const defaultTranscript: SpeakerSegment[] = [
  { 
    speaker: "Professor", 
    text: "Welcome to today's lecture on quantum mechanics. We'll be covering the basics of wave-particle duality.", 
    timestamp: "00:00:15" 
  },
  { 
    speaker: "Professor", 
    text: "The concept was first introduced by Louis de Broglie in 1924. He proposed that all matter has wave-like properties.", 
    timestamp: "00:00:35" 
  },
  { 
    speaker: "Student 1", 
    text: "Can you explain how this relates to the double-slit experiment?", 
    timestamp: "00:01:10" 
  },
  { 
    speaker: "Professor", 
    text: "Great question. The double-slit experiment demonstrates this duality. When electrons are sent through two slits, they create an interference pattern on the detector screen, which is a characteristic of waves.", 
    timestamp: "00:01:20" 
  },
  { 
    speaker: "Student 2", 
    text: "Is this why we can't determine both position and momentum precisely?", 
    timestamp: "00:02:05" 
  },
  { 
    speaker: "Professor", 
    text: "Exactly! That leads us to Heisenberg's Uncertainty Principle. It states that we cannot simultaneously know both the position and momentum of a particle with perfect precision.", 
    timestamp: "00:02:15" 
  },
];

const TranscriptViewer = ({ 
  title = "Quantum Mechanics Lecture", 
  transcript = defaultTranscript,
  onTranscriptGenerated
}: TranscriptViewerProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("transcript");

  // Call onTranscriptGenerated with the full transcript text when component mounts
  useEffect(() => {
    if (onTranscriptGenerated && transcript) {
      const fullText = transcript.map(segment => `${segment.speaker}: ${segment.text}`).join('\n');
      onTranscriptGenerated(fullText);
    }
  }, [transcript, onTranscriptGenerated]);

  const toggleFavorite = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(i => i !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const generateSummary = () => {
    // In a real app, this would be generated with AI
    return (
      <div className="space-y-4">
        <p>Key points from the lecture:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Introduction to wave-particle duality, proposed by Louis de Broglie in 1924</li>
          <li>Discussion of the double-slit experiment as evidence for wave-particle duality</li>
          <li>Explanation of Heisenberg's Uncertainty Principle and its implications</li>
        </ul>
      </div>
    );
  };

  const generateQuestions = () => {
    // In a real app, this would be generated with AI
    return (
      <div className="space-y-4">
        <div className="p-3 border rounded-md mb-3">
          <p className="font-medium mb-1">What is wave-particle duality?</p>
          <p className="text-sm text-muted-foreground">
            The concept that all matter exhibits both wave and particle properties.
          </p>
        </div>
        <div className="p-3 border rounded-md mb-3">
          <p className="font-medium mb-1">What does the double-slit experiment demonstrate?</p>
          <p className="text-sm text-muted-foreground">
            It shows that electrons create interference patterns like waves while also behaving like particles.
          </p>
        </div>
        <div className="p-3 border rounded-md mb-3">
          <p className="font-medium mb-1">What is Heisenberg's Uncertainty Principle?</p>
          <p className="text-sm text-muted-foreground">
            It states that we cannot simultaneously measure both the position and momentum of a particle with perfect precision.
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="ghost">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button size="sm" variant="ghost">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button size="sm" variant="ghost">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transcript" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>
          <TabsContent value="transcript">
            <div className="space-y-6">
              {transcript.map((segment, index) => (
                <div key={index} className="border-l-4 pl-4 py-1 hover:bg-muted/50 rounded-sm relative">
                  <div className="flex justify-between items-start mb-1">
                    <Badge variant={segment.speaker === "Professor" ? "default" : "outline"}>
                      {segment.speaker}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{segment.timestamp}</span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6"
                        onClick={() => toggleFavorite(index)}
                      >
                        <Star 
                          className={cn("h-4 w-4", favorites.includes(index) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} 
                        />
                      </Button>
                    </div>
                  </div>
                  <p>{segment.text}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="summary">
            {generateSummary()}
          </TabsContent>
          <TabsContent value="questions">
            {generateQuestions()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TranscriptViewer;
