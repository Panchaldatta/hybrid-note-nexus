
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, FileText, BookOpen, ArrowRight, Share2, ChevronRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                NoteFusion
              </h1>
              <p className="text-xl md:text-2xl font-light">
                Where voice, handwriting, and digital notes converge
              </p>
              <p className="text-lg opacity-90 max-w-lg">
                The all-in-one notes app for students to record lectures, auto-generate transcripts, scan handwritten annotations, and share structured hybrid notes.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" asChild className="gap-2">
                  <Link to="/recorder">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 text-white border-white hover:bg-white/10">
                  <Link to="/notes">
                    View Demo
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                {/* Main notebook image */}
                <div className="bg-white rounded-lg shadow-2xl p-4 z-10 relative">
                  <div className="border-b pb-3 mb-3">
                    <h3 className="font-medium">Quantum Physics Lecture</h3>
                    <p className="text-sm text-muted-foreground">April 15, 2025</p>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="text-sm text-primary font-medium">Professor Davis:</p>
                    <p>Wave-particle duality is a key concept in quantum mechanics...</p>
                    <div className="border-l-2 border-primary pl-2 my-2">
                      <p className="text-xs font-medium">My notes:</p>
                      <p className="text-xs italic">Remember to review the double-slit experiment!</p>
                    </div>
                    <p className="text-sm text-primary font-medium">Professor Davis:</p>
                    <p>The Schrödinger equation describes how the quantum state changes...</p>
                  </div>
                </div>
                
                {/* Background stacked effect */}
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-accent rounded-lg z-0"></div>
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-secondary rounded-lg z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How NoteFusion Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Mic className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Record & Transcribe</h3>
              <p className="text-muted-foreground">
                Record lectures or upload audio files. AI transcribes content with speaker labels and auto-generates summaries.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scan & Digitize</h3>
              <p className="text-muted-foreground">
                Snap photos of handwritten notes or upload scanned images. OCR technology converts your notes into searchable text.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-md flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Merge & Share</h3>
              <p className="text-muted-foreground">
                Combine audio transcripts with scanned notes. Create comprehensive study materials and share with classmates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your note-taking?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Start creating hybrid notes that combine the best of audio, digital, and handwritten content.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/recorder">Start Recording</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/scanner">Scan Notes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-8">Why Students Love NoteFusion</h2>
              
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Never Miss a Detail</h3>
                    <p className="text-muted-foreground">
                      Capture everything with audio recordings that automatically transcribe into searchable text.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Effortless Organization</h3>
                    <p className="text-muted-foreground">
                      Keep all your notes in one place with our intuitive interface and powerful search.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Summaries</h3>
                    <p className="text-muted-foreground">
                      Get automatic bullet points, definitions, and study questions from your lectures.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0 text-primary">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Seamless Sharing</h3>
                    <p className="text-muted-foreground">
                      Collaborate with classmates by sharing hybrid notes with full access control.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button variant="outline" asChild className="gap-2">
                  <Link to="/notes">
                    Explore All Features 
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="NoteFusion in action" 
                  className="rounded-lg shadow-lg border"
                />
                <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-primary/10 rounded-full z-0"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">NF</div>
              <span className="text-lg font-semibold">NoteFusion</span>
            </div>
            
            <div className="flex gap-6">
              <Link to="/recorder" className="text-muted-foreground hover:text-foreground">Recorder</Link>
              <Link to="/scanner" className="text-muted-foreground hover:text-foreground">Scanner</Link>
              <Link to="/notes" className="text-muted-foreground hover:text-foreground">Notes</Link>
            </div>
            
            <div>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 NoteFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
