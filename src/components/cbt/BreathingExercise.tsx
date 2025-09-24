import React, { useEffect, useRef } from 'react';

export default function BreathingExercise() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id: number;
    let expand = true;
    const el = circleRef.current;
    if (!el) return;
    let t = 0;
    const tick = () => {
      t += 0.016;
      const phase = (Math.sin(t) + 1) / 2; // 0..1
      const scale = 0.8 + phase * 0.4; // 0.8..1.2
      el.style.transform = `scale(${scale})`;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div ref={circleRef} className="w-24 h-24 rounded-full bg-purple-200" />
      <div className="text-sm text-gray-700">
        Breathe in… 1 2 3 4 5. Breathe out… 5 4 3 2 1.
      </div>
    </div>
  );
}
