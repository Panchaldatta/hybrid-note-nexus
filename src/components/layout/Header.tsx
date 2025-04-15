
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNewNote = (type: 'audio' | 'scan' | 'hybrid') => {
    setIsDialogOpen(false);
    switch (type) {
      case 'audio':
        navigate('/recorder');
        break;
      case 'scan':
        navigate('/scanner');
        break;
      case 'hybrid':
        navigate('/merger');
        break;
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white font-bold">NF</div>
          <span className="text-xl font-semibold">NoteFusion</span>
        </Link>
        <nav className="hidden md:flex ml-4 flex-1 items-center gap-5 text-sm">
          <Link to="/notes" className="text-muted-foreground transition-colors hover:text-foreground">
            My Notes
          </Link>
          <Link to="/recorder" className="text-muted-foreground transition-colors hover:text-foreground">
            Recorder
          </Link>
          <Link to="/scanner" className="text-muted-foreground transition-colors hover:text-foreground">
            Scanner
          </Link>
          <Link to="/merger" className="text-muted-foreground transition-colors hover:text-foreground">
            Merger
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>Account</span>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>New Note</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Button onClick={() => handleNewNote('audio')} className="flex items-center gap-2 justify-start">
                  Record Audio Note
                </Button>
                <Button onClick={() => handleNewNote('scan')} className="flex items-center gap-2 justify-start">
                  Scan Written Notes
                </Button>
                <Button onClick={() => handleNewNote('hybrid')} className="flex items-center gap-2 justify-start">
                  Create Hybrid Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
