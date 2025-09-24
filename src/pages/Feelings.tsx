import feelingsCharacters from "@/assets/feelings-characters.png";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeelingsPicker from "@/components/cbt/FeelingsPicker";
import CopingStrategies from "@/components/cbt/CopingStrategies";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";

export default function Feelings() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const problem = searchParams.get("problem") || "";
  const thought = searchParams.get("thought") || "";
  
  const [feeling, setFeeling] = useState<string | undefined>(undefined);

  const handleNext = () => {
    if (feeling) {
      navigate(`/behaviors?problem=${encodeURIComponent(problem)}&thought=${encodeURIComponent(thought)}&feeling=${encodeURIComponent(feeling)}`);
    }
  };

  return (
    <>
      <SEO
        title="How Are You Feeling? | CBT for Kids"
        description="Explore your feelings and discover calming tools to help you feel better."
        canonicalPath="/feelings"
      />
      <main className="relative min-h-screen bg-background">
        <BackgroundEmojiField />
        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-8 animate-fade-in bg-gradient-to-r from-accent to-green-400 rounded-lg p-6 shadow-lg">
              <img 
                src={feelingsCharacters} 
                alt="Happy feelings characters" 
                className="w-32 h-16 mx-auto mb-4 animate-bounce object-cover rounded-lg"
              />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-black font-fredoka">
                😊 How Are You Feeling? 🌟
              </h1>
              <p className="text-lg text-black/90 font-nunito">
                Now that we've looked at your thoughts, let's explore how they made you feel! ✨
              </p>
            </header>

            <div className="space-y-6">
              <Card className="animate-bounce-in bg-gradient-to-br from-white to-purple-50 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl font-fredoka">Pick Your Feeling! 🎭</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-secondary/30">
                    <p className="text-sm font-nunito">
                      <strong className="text-primary">Remember your thought:</strong> "{thought}" 🤔
                    </p>
                    <p className="text-sm mt-2 text-muted-foreground font-nunito">
                      How did this thought make you feel? Pick as many as you'd like! 😊
                    </p>
                  </div>
                  
                  <FeelingsPicker selected={feeling} onSelect={setFeeling} />
                </CardContent>
              </Card>

              {feeling && (
                <Card className="animate-fade-in bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-xl font-fredoka text-accent">Try These Calming Tools! 🛠️✨</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CopingStrategies feeling={feeling} />
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between border-t-2 border-primary/20 pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/game?problem=${encodeURIComponent(problem)}&thought=${encodeURIComponent(thought)}`)}
                  className="hover:animate-wiggle font-fredoka font-semibold hover:bg-gray-100"
                >
                  ← Back to Game
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleNext}
                  disabled={!feeling}
                  size="lg"
                  className="hover:animate-pulse-soft bg-gradient-to-r from-primary to-pink-500 hover:from-pink-500 hover:to-primary transform hover:scale-105 transition-all duration-300 font-fredoka font-bold shadow-lg"
                >
                  Next Adventure! 🎯 →
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}