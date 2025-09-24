import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COGNITIVE_DISTORTIONS } from "@/lib/cbt-content";
import ThoughtTrapsChat from "./ThoughtTrapsChat";

export default function ThoughtTraps() {
  const [showChat, setShowChat] = useState(false);
  // Show first 6 cognitive distortions
  const items = COGNITIVE_DISTORTIONS.slice(0, 6);

  if (showChat) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-foreground">
            Thought Traps Chat
          </h3>
          <Button
            variant="outline"
            onClick={() => setShowChat(false)}
          >
            ← Back to Cards
          </Button>
        </div>
        <ThoughtTrapsChat />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Common Thought Traps
        </h3>
        <p className="text-muted-foreground mb-4">
          These are tricky thinking patterns that can make us feel worse. Learn to spot them!
        </p>
        <Button
          onClick={() => setShowChat(true)}
          className="mb-4"
        >
          Chat with the Bot
        </Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((trap, index) => (
          <Card 
            key={trap.name} 
            className="hover-scale transition-all duration-200 hover:shadow-lg bg-gradient-to-br from-white via-yellow-50 to-orange-50 border-4 border-primary/30 hover:border-accent shadow-xl"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-fredoka flex items-center gap-2">
                <span className="text-2xl">{trap.emoji}</span>
                {trap.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-700 font-nunito mb-1">What it means:</p>
                <p className="text-xs text-blue-600">{trap.description}</p>
              </div>
              
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="font-medium text-red-700 font-nunito mb-1">Example:</p>
                <p className="text-xs text-red-600 italic">"{trap.example}"</p>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="font-medium text-green-700 font-nunito mb-1">Try this instead:</p>
                <p className="text-xs text-green-600 font-semibold">"{trap.reframe}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-4 border-yellow-300">
        <p className="text-sm font-nunito text-orange-700">
          💡 <strong>Remember:</strong> Everyone has these thought traps sometimes! The key is noticing them and trying a different way to think. 🌟
        </p>
        <Button
          onClick={() => setShowChat(true)}
          className="mt-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 font-fredoka font-black shadow-lg hover:shadow-xl"
        >
          🤖 Chat with the Bot for Help!
        </Button>
      </div>
    </div>
  );
}
