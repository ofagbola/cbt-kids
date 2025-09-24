import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import BackgroundEmojiField from "@/components/BackgroundEmojiField";
import ProgressTracker from "@/components/ProgressTracker";
import ThemeToggle from "@/components/ThemeToggle";
import { MessageSquare, Brain, Heart, Gamepad2, Settings, Home, BookOpen, Users } from "lucide-react";

const CATEGORIES = [
  { label: "I feel anxious", value: "nervous", icon: "😰" },
  { label: "I made a mistake", value: "mistake", icon: "😅" },
  { label: "I had a fight", value: "fight", icon: "😠" },
  { label: "I'm scared about school", value: "school", icon: "🏫" },
  { label: "I feel overwhelmed", value: "overwhelmed", icon: "😵" },
];

const Index = () => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const onGo = () => {
    const query = q.trim();
    if (query) navigate(`/thoughts?problem=${encodeURIComponent(query)}`);
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'What is CBT?', acceptedAnswer: { '@type': 'Answer', text: 'CBT helps us notice how thoughts, feelings, and behaviors connect.' } },
      { '@type': 'Question', name: 'Is this for kids?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! This site is made for ages 8–12 with friendly language and activities.' } },
    ],
  };

  return (
    <>
      <SEO
        title="CBT Tools for Kids | Feelings Explorer"
        description="A bright, kid-friendly CBT space to explore thoughts, feelings, and behaviors with games and coping tools."
        canonicalPath="/"
        jsonLd={faqJsonLd}
      />
      <main className="flex h-screen bg-background">
        <BackgroundEmojiField />
        
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">CBT Kids</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate('/')}>
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate('/thoughts')}>
              <MessageSquare className="w-4 h-4" />
              Thoughts
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate('/feelings')}>
              <Heart className="w-4 h-4" />
              Feelings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate('/games')}>
              <Gamepad2 className="w-4 h-4" />
              Games
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => navigate('/cbt')}>
              <Brain className="w-4 h-4" />
              CBT App
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="w-4 h-4" />
              Resources
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="w-4 h-4" />
              Community
            </Button>
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-border">
            <ThemeToggle />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-foreground">CBT Tools for Kids</h1>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </header>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
            {/* Welcome Message */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-lg p-4 max-w-2xl">
                <p className="text-foreground">
                  Hi there! 👋 I'm here to help you explore your thoughts, feelings, and behaviors. 
                  What's on your mind today? You can ask me anything or try one of the activities below!
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
              
              {/* Search Input */}
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question or problem here..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && onGo()}
                  className="flex-1"
                />
                <Button onClick={onGo} disabled={!q.trim()}>
                  Send
                </Button>
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {CATEGORIES.map((category) => (
                  <Card 
                    key={category.value}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/thoughts?problem=${encodeURIComponent(category.label)}`)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-sm font-medium text-foreground">{category.label}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Your Progress</h2>
              <ProgressTracker showDetails={false} />
            </div>

            {/* Games Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Interactive Games</h2>
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/games")}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-medium text-foreground">Thought Sorter Game</h3>
                      <p className="text-sm text-muted-foreground">Learn to identify helpful vs unhelpful thoughts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;