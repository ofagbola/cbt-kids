import { useMemo, useRef, useEffect } from "react";

const EMOJIS = ["😊", "🌈", "⭐", "🦋", "🎈", "🧠", "💫", "🍀", "🐣", "🎨", "📚", "⚽", "🎭", "🎪", "🎯", "🎊", "🏆", "💎", "🌟", "🎁"];

export default function BackgroundEmojiField() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => Array.from({ length: 20 }, (_, i) => ({ id: i, emoji: EMOJIS[i % EMOJIS.length] })), []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const offsetX = (clientX / innerWidth - 0.5) * 10;
      const offsetY = (clientY / innerHeight - 0.5) * 10;
      Array.from(container.children).forEach((child, idx) => {
        const depth = (idx % 6) + 4;
        (child as HTMLElement).style.transform = `translate(${offsetX / depth}px, ${offsetY / depth}px)`;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div ref={containerRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden">
      <div className="relative size-full">
        {items.map((item, i) => (
          <span
            key={item.id}
            className="absolute text-4xl md:text-5xl opacity-40 animate-float hover:animate-bounce hover:opacity-60 transition-all duration-300 cursor-pointer select-none"
            style={{
              left: `${(i * 83) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
