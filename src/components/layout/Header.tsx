
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Button size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>New Note</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
