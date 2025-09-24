import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ReflectionCard from "@/components/cbt/ReflectionCard";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";
import { saveJourney } from "@/lib/storage";
import confetti from "canvas-confetti";

export default function Behaviors() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const problem = searchParams.get("problem") || "";
  const thought = searchParams.get("thought") || "";
  const feeling = searchParams.get("feeling") || "";
  
  const [behavior, setBehavior] = useState("");
  const [plan, setPlan] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleFinish = () => {
    // Save the completed journey to local storage
    const journey = saveJourney({
      problem,
      thought,
      feeling,
      behavior,
      plan,
      completed: true
    });

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Additional confetti bursts
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
    }, 300);

    setCompleted(true);
  };

  const handleStartOver = () => {
    navigate('/');
  };

  return (
    <>
      <SEO
        title="What Did You Do? | CBT for Kids"
        description="Reflect on your behaviors and make a plan for next time in this final CBT step."
        canonicalPath="/behaviors"
      />
      <main className="relative min-h-screen bg-background">
        <BackgroundEmojiField />
        <section className="container py-12">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                🏃 What Did You Do?
              </h1>
              <p className="text-lg text-muted-foreground">
                Let's think about how you acted and make a plan for next time.
              </p>
            </header>

            {!completed ? (
              <div className="space-y-6">
                <Card className="animate-bounce-in">
                  <CardHeader>
                    <CardTitle className="text-xl">Your Journey So Far</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <p><strong>Problem:</strong> {problem}</p>
                      <p><strong>Thought:</strong> {thought}</p>
                      <p><strong>Feeling:</strong> {feeling}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-bounce-in" style={{ animationDelay: '0.1s' }}>
                  <CardHeader>
                    <CardTitle className="text-xl">Reflect on Your Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="behavior">
                          What did you do (or want to do)?
                        </label>
                        <Textarea 
                          id="behavior" 
                          placeholder="e.g., I yelled at my brother" 
                          value={behavior} 
                          onChange={(e) => setBehavior(e.target.value)}
                          className="transition-all duration-200 focus:scale-105"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="plan">
                          What's your plan for next time?
                        </label>
                        <Textarea 
                          id="plan" 
                          placeholder="e.g., I'll take 3 deep breaths or ask for space" 
                          value={plan} 
                          onChange={(e) => setPlan(e.target.value)}
                          className="transition-all duration-200 focus:scale-105"
                          rows={3}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                  <CardContent className="pt-6">
                    <ReflectionCard question="How do you think your new plan might change how you feel?" />
                  </CardContent>
                </Card>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/feelings?problem=${encodeURIComponent(problem)}&thought=${encodeURIComponent(thought)}`)}
                    className="hover:animate-wiggle"
                  >
                    ← Back to Feelings
                  </Button>
                  <Button 
                    variant="hero" 
                    onClick={handleFinish}
                    disabled={!behavior.trim() || !plan.trim()}
                    size="lg"
                    className="hover:animate-tada"
                  >
                    Finish Journey! 🎉
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="animate-bounce-in bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="text-center py-12">
                  <div className="text-8xl mb-6 animate-bounce">🎉</div>
                  <h2 className="text-3xl font-bold text-primary mb-4">
                    Amazing Work!
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                    You've completed your CBT journey! You've learned to notice your thoughts, 
                    understand your feelings, and make better choices. That's incredible!
                  </p>
                  <div className="bg-white/50 p-6 rounded-lg mb-8 text-left max-w-2xl mx-auto">
                    <h3 className="font-bold mb-4">Your CBT Triangle:</h3>
                    <div className="space-y-3 text-sm">
                      <p><strong>🧠 Thought:</strong> {thought}</p>
                      <p><strong>😊 Feeling:</strong> {feeling}</p>
                      <p><strong>🏃 Behavior:</strong> {behavior}</p>
                      <p><strong>💡 New Plan:</strong> {plan}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      variant="hero" 
                      size="lg"
                      onClick={handleStartOver}
                      className="hover:animate-pulse-soft"
                    >
                      Try Another Problem
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate('/')}
                      className="hover:animate-wiggle"
                    >
                      Back Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </>
  );
}