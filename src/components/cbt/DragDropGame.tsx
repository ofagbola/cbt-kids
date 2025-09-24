import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STARTING = [
  { id: 1, text: "I never do anything right" },
  { id: 2, text: "What if tomorrow is a disaster?" },
  { id: 3, text: "They didn't text me so they hate me" },
  { id: 4, text: "I messed up — I'm a failure" },
  { id: 5, text: "I can learn from this mistake" },
  { id: 6, text: "Everyone makes mistakes sometimes" },
  { id: 7, text: "I should be perfect at everything" },
  { id: 8, text: "I'm doing my best and that's enough" },
];

export default function DragDropGame({ onComplete }: { onComplete?: () => void }) {
  const [unplaced, setUnplaced] = useState(STARTING);
  const [helpful, setHelpful] = useState<typeof STARTING>([]);
  const [unhelpful, setUnhelpful] = useState<typeof STARTING>([]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("text/plain", String(id));
  };

  const moveTo = (target: "helpful" | "unhelpful") => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    const all = [...unplaced, ...helpful, ...unhelpful];
    const card = all.find((c) => c.id === id);
    if (!card) return;
    setUnplaced((prev) => prev.filter((c) => c.id !== id));
    setHelpful((prev) => (target === "helpful" ? [...prev, card] : prev.filter((c) => c.id !== id)));
    setUnhelpful((prev) => (target === "unhelpful" ? [...prev, card] : prev.filter((c) => c.id !== id)));
    
    // Check if game is completed and trigger callback
    const remainingCards = unplaced.filter((c) => c.id !== id);
    if (remainingCards.length === 0 && onComplete) {
      setTimeout(onComplete, 500); // Small delay for visual feedback
    }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const Bucket = ({ title, items, onDrop }: { title: string; items: typeof STARTING; onDrop: (e: React.DragEvent<HTMLDivElement>) => void }) => (
    <Card onDrop={onDrop} onDragOver={allowDrop} className="min-h-36">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.length === 0 && <p className="text-sm text-muted-foreground">Drop here</p>}
        {items.map((c) => (
          <div key={c.id} className="text-sm p-2 rounded-md bg-secondary" draggable onDragStart={(e) => onDragStart(e, c.id)}>
            {c.text}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {unplaced.length === 0 && <p className="text-sm text-muted-foreground">Nice sorting! 🎉</p>}
          {unplaced.map((c) => (
            <div key={c.id} className="text-sm p-2 rounded-md bg-accent cursor-grab" draggable onDragStart={(e) => onDragStart(e, c.id)}>
              {c.text}
            </div>
          ))}
        </CardContent>
      </Card>

      <Bucket title="Helpful" items={helpful} onDrop={moveTo("helpful")} />
      <Bucket title="Unhelpful" items={unhelpful} onDrop={moveTo("unhelpful")} />
    </div>
  );
}
