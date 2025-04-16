
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, FileText, BookOpen, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-primary to-indigo-500">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-grid-12" />
        <div className="relative">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-8 text-white">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  NoteFusion
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-90 max-w-xl">
                  Transform your note-taking experience with AI-powered audio transcription and handwriting recognition.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/recorder">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-40"></div>
                  <div className="relative bg-black/80 backdrop-blur-xl rounded-lg p-6 shadow-2xl border border-white/10">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/90">
                        <Mic className="h-5 w-5" />
                        <span>Recording lecture...</span>
                      </div>
                      <div className="h-24 bg-gradient-to-r from-purple-500/20 to-transparent rounded-md" />
                      <div className="space-y-2">
                        <div className="h-3 w-3/4 bg-white/10 rounded" />
                        <div className="h-3 w-1/2 bg-white/10 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Audio Recording</h3>
              <p className="text-muted-foreground">
                Record lectures with automatic transcription and speaker detection.
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Note Scanning</h3>
              <p className="text-muted-foreground">
                Convert handwritten notes into searchable digital text instantly.
              </p>
            </div>

            <div className="bg-background/50 backdrop-blur-sm p-8 rounded-2xl border shadow-lg">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Fusion</h3>
              <p className="text-muted-foreground">
                Combine audio transcripts with scanned notes seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
