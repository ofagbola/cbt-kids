import { Button } from "@/components/ui/button";

const FEELINGS = [
  { key: "angry", emoji: "😡", label: "Angry" },
  { key: "nervous", emoji: "😰", label: "Nervous" },
  { key: "sad", emoji: "😢", label: "Sad" },
  { key: "happy", emoji: "😊", label: "Happy" },
  { key: "tired", emoji: "😴", label: "Tired" },
  { key: "frustrated", emoji: "😖", label: "Frustrated" },
];

export default function FeelingsPicker({ selected, onSelect }: { selected?: string; onSelect: (f: string) => void }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {FEELINGS.map((f, index) => (
        <Button
          key={f.key}
          variant={selected === f.key ? "hero" : "secondary"}
          size="pill"
          onClick={() => onSelect(f.key)}
          aria-pressed={selected === f.key}
          aria-label={`Feeling ${f.label}`}
          className={`animate-bounce-in hover:animate-pulse-soft ${
            selected === f.key ? 'animate-tada' : ''
          }`}
          style={{ 
            animationDelay: `${index * 75}ms`,
            animationFillMode: 'both'
          }}
        >
          <span className="text-lg mr-1" aria-hidden>
            {f.emoji}
          </span>
          {f.label}
        </Button>
      ))}
    </div>
  );
}
