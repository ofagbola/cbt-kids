import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getCopingStrategiesForFeeling, CopingStrategy } from "@/lib/cbt-content";

export default function CopingStrategies({ feeling }: { feeling?: string }) {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);
  
  const strategies = feeling ? getCopingStrategiesForFeeling(feeling) : [
    {
      name: "5-4-3-2-1 Grounding",
      description: "Connect with your senses to feel calmer",
      steps: ["Name 5 things you can see", "Name 4 things you can touch", "Name 3 things you can hear", "Name 2 things you can smell", "Name 1 thing you can taste"],
      emoji: "🌍",
      category: "grounding" as const
    },
    {
      name: "Butterfly Hugs",
      description: "Cross your arms and tap gently",
      steps: ["Cross your arms over your chest", "Tap your shoulders alternately", "Continue for 30 seconds", "Take deep breaths while tapping"],
      emoji: "🦋",
      category: "movement" as const
    },
    {
      name: "Belly Breathing",
      description: "Deep breathing to calm your body",
      steps: ["Put one hand on your belly", "Breathe in slowly through your nose", "Feel your belly rise", "Breathe out slowly through your mouth", "Repeat 5-10 times"],
      emoji: "🫁",
      category: "breathing" as const
    }
  ];

  const toggleExpanded = (strategyName: string) => {
    setExpandedStrategy(expandedStrategy === strategyName ? null : strategyName);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground font-nunito">
          Choose a calming tool that feels right for you! 🌟
        </p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {strategies.map((strategy, idx) => (
          <Card 
            key={idx} 
            className={`hover-scale transition-all duration-200 ${
              expandedStrategy === strategy.name ? 'ring-2 ring-primary/50' : ''
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-fredoka flex items-center gap-2">
                <span className="text-lg">{strategy.emoji}</span>
                {strategy.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground font-nunito">
                {strategy.description}
              </p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleExpanded(strategy.name)}
                className="w-full text-xs font-nunito"
              >
                {expandedStrategy === strategy.name ? 'Hide Steps' : 'Show Steps'}
              </Button>
              
              {expandedStrategy === strategy.name && (
                <div className="space-y-2 animate-fade-in">
                  <h4 className="font-semibold text-sm text-primary font-fredoka">
                    How to do it:
                  </h4>
                  <ol className="space-y-1 text-xs text-muted-foreground font-nunito">
                    {strategy.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex items-start gap-2">
                        <span className="bg-primary/20 text-primary rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {stepIdx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <p className="text-xs text-muted-foreground font-nunito">
          💡 Try different tools to see what works best for you!
        </p>
      </div>
    </div>
  );
}
