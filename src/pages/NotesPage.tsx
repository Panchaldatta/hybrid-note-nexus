
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mic, FileText, Share2, MoreHorizontal, Search, Plus } from "lucide-react";
import { Note, getNotes } from "@/services/mongodb";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TranscriptViewer from "@/components/notes/TranscriptViewer";
import { toast } from "sonner";

const NoteCard = ({ note, onOpen, onShare }: { note: Note, onOpen: (note: Note) => void, onShare: (note: Note) => void }) => {
  const getIcon = () => {
    switch (note.type) {
      case "audio":
        return <Mic className="h-4 w-4" />;
      case "scan":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{note.title}</span>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span>{note.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              {getIcon()}
              <span className="capitalize">{note.type}</span>
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground text-sm">{note.excerpt}</p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1" onClick={() => onOpen(note)}>Open</Button>
        <Button size="sm" variant="outline" onClick={() => onShare(note)}>
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const NoteCardSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </CardContent>
    <CardFooter className="flex gap-2">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="h-9 w-10" />
    </CardFooter>
  </Card>
);

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setNotes(fetchedNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = activeTab === "all" 
    ? notes 
    : notes.filter(note => note.type === activeTab.replace('ed', ''));

  const handleCreateNote = (type: 'audio' | 'scan') => {
    switch (type) {
      case 'audio':
        navigate('/recorder');
        break;
      case 'scan':
        navigate('/scanner');
        break;
    }
  };

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note);
    setIsNoteOpen(true);
  };

  const handleShareNote = (note: Note) => {
    // In a real app, this would open a share dialog or implement sharing functionality
    // For now, we'll just show a toast notification
    if (navigator.share) {
      navigator.share({
        title: note.title,
        text: `Check out my note: ${note.title}`,
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => toast.error("Error sharing: " + error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast.success(`Sharing "${note.title}" (Web Share API not supported in this browser)`);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <div className="flex gap-2">
          <Button onClick={() => handleCreateNote('audio')} variant="outline" className="gap-2">
            <Mic className="h-4 w-4" />
            New Audio Note
          </Button>
          <Button onClick={() => handleCreateNote('scan')} className="gap-2">
            <FileText className="h-4 w-4" />
            New Scan
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Sort</Button>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="scanned">Scanned</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((index) => (
                <NoteCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note) => (
                <NoteCard 
                  key={note.id} 
                  note={note} 
                  onOpen={handleOpenNote} 
                  onShare={handleShareNote} 
                />
              ))}
            </div>
          )}
        </TabsContent>

        {["audio", "scanned"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2].map((index) => (
                  <NoteCardSkeleton key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <NoteCard 
                    key={note.id} 
                    note={note} 
                    onOpen={handleOpenNote} 
                    onShare={handleShareNote}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Note viewing dialog */}
      <Dialog open={isNoteOpen} onOpenChange={setIsNoteOpen}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedNote?.title}</DialogTitle>
          </DialogHeader>
          {selectedNote?.type === "audio" ? (
            <TranscriptViewer title={selectedNote.title} />
          ) : (
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{selectedNote?.title}</h3>
              <p>{selectedNote?.excerpt}</p>
              {selectedNote?.imageUrls && selectedNote.imageUrls.length > 0 && (
                <div className="mt-4">
                  {selectedNote.imageUrls.map((url, index) => (
                    <img 
                      key={index} 
                      src={url} 
                      alt={`Scan ${index + 1}`} 
                      className="my-4 max-w-full rounded-md shadow-md" 
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesPage;
