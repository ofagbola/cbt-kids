import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ThoughtTraps from "@/components/cbt/ThoughtTraps";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";
import { detectCognitiveDistortions, getReframeSuggestions, COGNITIVE_DISTORTIONS } from "@/lib/cbt-content";

export default function Thoughts() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialProblem = searchParams.get("problem") || "";
  
  const [thought, setThought] = useState("");

  useEffect(() => {
    if (initialProblem) setThought(initialProblem);
  }, [initialProblem]);

  const detectedDistortions = detectCognitiveDistortions(thought);
  const reframeIdeas = getReframeSuggestions(detectedDistortions);

  const handleNext = () => {
    if (thought.trim()) {
      navigate(`/game?problem=${encodeURIComponent(initialProblem)}&thought=${encodeURIComponent(thought)}`);
    }
  };

  return (
    <>
      <SEO
        title="What Were You Thinking? | CBT for Kids"
        description="Explore your thoughts and learn about thinking patterns in this kid-friendly CBT exercise."
        canonicalPath="/thoughts"
      />
      <main className="relative min-h-screen bg-background">
        <BackgroundEmojiField />
        <section className="container py-12">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-heading text-primary">
                What Were You Thinking? 🧠
              </h1>
              <p className="text-lg text-muted-foreground font-body">
                Let's explore the thoughts that popped into your head when you experienced: "{initialProblem}"
              </p>
            </header>

            <Card className="animate-bounce-in">
              <CardHeader>
                <CardTitle className="text-xl font-heading">Tell us about your thoughts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="thought">
                    What did you think when that happened?
                  </label>
                  <Input
                    id="thought"
                    placeholder="e.g., I'm scared about school tomorrow"
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    className="text-lg p-4 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary transition-all duration-200"
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Remember:</strong> Thoughts are the stories our brain tells us — sometimes helpful, sometimes not.
                  </p>
                </div>

                <ThoughtTraps />

                {thought && (
                  <div className="animate-fade-in">
                    <h3 className="font-semibold mb-3">Try thinking about it this way:</h3>
                    <ul className="space-y-2">
                      {reframeIdeas.map((idea, i) => (
                        <li 
                          key={i} 
                          className="bg-accent/20 p-3 rounded-lg text-sm animate-fade-in"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          ✨ {idea}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Show detected thought traps */}
                    {detectedDistortions.length > 0 && (
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2">Thought Traps Detected:</h4>
                        <div className="flex flex-wrap gap-2">
                          {detectedDistortions.map((distortion, i) => (
                            <span 
                              key={i}
                              className="bg-white/50 px-2 py-1 rounded text-xs font-nunito"
                            >
                              {distortion.emoji} {distortion.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/')}
                    className="hover:animate-wiggle"
                  >
                    ← Back Home
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleNext}
                    disabled={!thought.trim()}
                    size="lg"
                    className="hover:animate-pulse-soft"
                  >
                    Next: Sort Thoughts →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}