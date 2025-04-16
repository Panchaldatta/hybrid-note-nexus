
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, FileText, Image, BookOpen, Clock, Star, FolderOpen, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, isActive }: SidebarItemProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      className={cn(
        "flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-sm",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      <Link to={href}>
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

const Sidebar = () => {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-muted/40">
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-1 px-2">
          <h3 className="mb-2 px-4 text-sm font-semibold">Create</h3>
          <SidebarItem icon={Mic} label="Record Audio" href="/recorder" />
          <SidebarItem icon={FileText} label="Upload Audio" href="/upload-audio" />
          <SidebarItem icon={Image} label="Scan Notes" href="/scanner" />
          
          <h3 className="mb-2 mt-6 px-4 text-sm font-semibold">Library</h3>
          <SidebarItem icon={BookOpen} label="All Notes" href="/notes" />
          <SidebarItem icon={Clock} label="Recent" href="/recent" />
          <SidebarItem icon={Star} label="Favorites" href="/favorites" />
          <SidebarItem icon={FolderOpen} label="Folders" href="/folders" />
          <SidebarItem icon={Share2} label="Shared" href="/shared" />
        </div>
      </ScrollArea>
    </aside>
  );
};

export default Sidebar;
