import { useState } from "react";
import confetti from "canvas-confetti";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DragDropGame from "@/components/cbt/DragDropGame";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";
import { useNavigate } from "react-router-dom";

export default function Games() {
  const [gameCompleted, setGameCompleted] = useState(false);
  const navigate = useNavigate();

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
    triggerConfetti();
  };

  const resetGame = () => {
    setGameCompleted(false);
  };

  return (
    <>
      <SEO
        title="Fun Games | CBT Tools for Kids"
        description="Play fun thought-sorting games to learn about helpful and unhelpful thinking patterns"
        canonicalPath="/games"
      />
      <main className="relative min-h-screen overflow-hidden bg-background">
        <BackgroundEmojiField />
        <div className="container py-8">
          <header className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 mb-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="hover:scale-105 transition-transform"
              >
                ← Back Home
              </Button>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-fredoka text-primary mb-4">
              🎮 Fun Games Zone! 🎯
            </h1>
            <p className="text-xl text-secondary font-nunito font-bold max-w-2xl mx-auto">
              Play games and learn about helpful vs unhelpful thoughts! 🧠✨
            </p>
          </header>

          <Card className="animate-bounce-in mb-6 bg-gradient-to-br from-white via-accent/5 to-primary/5 border-4 border-primary/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-fredoka text-primary">
                🌟 Thought Sorter Game 🌟
              </CardTitle>
              <p className="text-lg text-secondary font-nunito">
                Drag the thoughts into the right boxes. Are they helpful or unhelpful?
              </p>
            </CardHeader>
            <CardContent>
              <DragDropGame onComplete={handleGameComplete} />
            </CardContent>
          </Card>

          {gameCompleted && (
            <Card className="animate-bounce-in bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 shadow-xl">
              <CardContent className="text-center py-8">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-3xl font-fredoka font-black text-primary mb-2">
                  Amazing Job! 🏆
                </h2>
                <p className="text-lg text-secondary font-nunito font-bold mb-6">
                  You're getting great at spotting helpful vs unhelpful thoughts!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="playful"
                    size="lg"
                    onClick={resetGame}
                    className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-secondary font-fredoka font-black text-lg shadow-lg hover:shadow-xl border-2 border-white hover:scale-105 transition-all"
                  >
                    🔄 Play Again! 🎈
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={() => navigate("/")}
                    className="bg-white text-primary hover:bg-accent hover:text-black font-fredoka font-black text-lg shadow-lg hover:shadow-xl border-4 border-primary/30 hover:border-white hover:scale-105 transition-all"
                  >
                    🏠 Back to Home 🌈
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}