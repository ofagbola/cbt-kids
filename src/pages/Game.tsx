import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DragDropGame from "@/components/cbt/DragDropGame";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";

export default function Game() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const problem = searchParams.get("problem") || "";
  const thought = searchParams.get("thought") || "";
  
  const [gameCompleted, setGameCompleted] = useState(false);

  const triggerConfetti = () => {
    // Burst of confetti from center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    // Side cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 200);
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
    triggerConfetti();
  };

  const handleNext = () => {
    navigate(`/feelings?problem=${encodeURIComponent(problem)}&thought=${encodeURIComponent(thought)}`);
  };

  return (
    <>
      <SEO
        title="Sort Your Thoughts Game | CBT for Kids"
        description="Play our fun drag-and-drop game to learn which thoughts are helpful and which ones aren't."
        canonicalPath="/game"
      />
      <main className="relative min-h-screen bg-background">
        <BackgroundEmojiField />
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                🎮 Sort Your Thoughts!
              </h1>
              <p className="text-lg text-muted-foreground">
                Drag the thoughts into the right boxes. Are they helpful or unhelpful?
              </p>
            </header>

            <Card className="animate-bounce-in mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Mini-Game: Helpful vs Unhelpful Thoughts</CardTitle>
              </CardHeader>
              <CardContent>
                <DragDropGame onComplete={handleGameComplete} />
              </CardContent>
            </Card>

            {gameCompleted && (
              <Card className="animate-bounce-in bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="text-center py-8">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Awesome job!</h2>
                  <p className="text-muted-foreground mb-6">
                    You're getting really good at recognizing helpful and unhelpful thoughts!
                  </p>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={handleNext}
                    className="hover:animate-tada"
                  >
                    Next: How Do You Feel? →
                  </Button>
                </CardContent>
              </Card>
            )}

            {!gameCompleted && (
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/thoughts?problem=${encodeURIComponent(problem)}`)}
                  className="hover:animate-wiggle"
                >
                  ← Back to Thoughts
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleGameComplete}
                  className="opacity-50"
                >
                  Skip Game →
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}