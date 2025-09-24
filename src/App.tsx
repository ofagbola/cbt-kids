import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Thoughts from "./pages/Thoughts";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Feelings from "./pages/Feelings";
import Behaviors from "./pages/Behaviors";
import CBTApp from "./pages/CBTApp";
import CBTWelcome from "./pages/CBTWelcome";
import CBTHelp from "./pages/CBTHelp";
import CBTCalmCorner from "./pages/CBTCalmCorner";
import CBTJournal from "./pages/CBTJournal";
import CBTTEAThoughts from "./pages/CBTTEAThoughts";
import CBTTEAEmotions from "./pages/CBTTEAEmotions";
import CBTTEAActions from "./pages/CBTTEAActions";
import CBTGames from "./pages/CBTGames";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<CBTApp />} />
            <Route path="/cbt" element={<CBTApp />} />
            <Route path="/cbt/welcome" element={<CBTWelcome />} />
            <Route path="/cbt/help" element={<CBTHelp />} />
            <Route path="/cbt/calm" element={<CBTCalmCorner />} />
            <Route path="/cbt/journal" element={<CBTJournal />} />
            <Route path="/cbt/thoughts" element={<CBTTEAThoughts />} />
            <Route path="/cbt/emotions" element={<CBTTEAEmotions />} />
            <Route path="/cbt/actions" element={<CBTTEAActions />} />
            <Route path="/cbt/games" element={<CBTGames />} />
            <Route path="/thoughts" element={<Thoughts />} />
            <Route path="/game" element={<Game />} />
            <Route path="/games" element={<Games />} />
            <Route path="/feelings" element={<Feelings />} />
            <Route path="/behaviors" element={<Behaviors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
