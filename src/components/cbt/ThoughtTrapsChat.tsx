import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COGNITIVE_DISTORTIONS, CognitiveDistortion } from '@/lib/cbt-content';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ThoughtTrapsChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm here to help you learn about thought traps! 🧠✨ What's on your mind today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedTrap, setSelectedTrap] = useState<CognitiveDistortion | null>(null);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Detect thought traps in the user's message
    const detectedTraps = COGNITIVE_DISTORTIONS.filter(trap =>
      trap.keywords.some(keyword =>
        inputText.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    let botResponse = '';
    if (detectedTraps.length > 0) {
      const trap = detectedTraps[0];
      setSelectedTrap(trap);
      botResponse = `I noticed you might be using "${trap.name}"! 🤔 

${trap.description}

Here's an example: "${trap.example}"

Try thinking: "${trap.reframe}"

Would you like to learn more about this thought trap? 💡`;
    } else {
      botResponse = `Thanks for sharing! 😊 

Remember, thought traps are tricky thinking patterns that can make us feel worse. Some common ones are:

• Catastrophizing (thinking the worst will happen) 🌪️
• Black-and-white thinking (seeing only extremes) ⚫⚪
• Mind reading (assuming we know what others think) 🧠👀

Can you tell me about a thought that's bothering you? I can help you spot any thought traps! 🕵️‍♀️`;
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isBot: true,
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: "Hi there! I'm here to help you learn about thought traps! 🧠✨ What's on your mind today?",
      isBot: true,
      timestamp: new Date()
    }]);
    setSelectedTrap(null);
  };

  return (
    <div className="space-y-4">
      {/* Chat Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Thought Traps Chat Bot
        </h3>
        <p className="text-muted-foreground">
          Chat with me about your thoughts and I'll help you spot tricky thinking patterns!
        </p>
      </div>

      {/* Selected Thought Trap Info */}
      {selectedTrap && (
        <Card className="border border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
              {selectedTrap.emoji} {selectedTrap.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted p-3 rounded-lg">
              <p className="font-semibold text-foreground mb-1">What it means:</p>
              <p className="text-sm text-muted-foreground">{selectedTrap.description}</p>
            </div>
            <div className="bg-destructive/10 p-3 rounded-lg border border-destructive/20">
              <p className="font-semibold text-destructive mb-1">Example:</p>
              <p className="text-sm text-destructive italic">"{selectedTrap.example}"</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <p className="font-semibold text-primary mb-1">Try this instead:</p>
              <p className="text-sm text-primary font-semibold">"{selectedTrap.reframe}"</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Messages */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="h-96 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your thought here..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              Send
            </Button>
          </div>

          {/* Clear Chat Button */}
          <div className="mt-3 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
            >
              Clear Chat
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card className="bg-muted/50 border border-border">
        <CardContent className="p-4">
          <h4 className="font-semibold text-foreground mb-2">Quick Tips:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Share any thought that's making you feel worried or sad</li>
            <li>• I'll help you spot thought traps and suggest better ways to think</li>
            <li>• Remember: everyone has thought traps sometimes - it's normal!</li>
            <li>• The goal is to notice them and practice thinking differently</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}