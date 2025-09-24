import { useEffect, useRef } from 'react';

// Lightweight GSAP-like hover using Web Animations API (no extra dep)
export function useHoverBounce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onEnter = () => {
      el.animate(
        [
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-3px) scale(1.02)' },
          { transform: 'translateY(0) scale(1)' },
        ],
        { duration: 350, easing: 'cubic-bezier(.2,.8,.2,1)' }
      );
    };
    el.addEventListener('mouseenter', onEnter);
    return () => el.removeEventListener('mouseenter', onEnter);
  }, []);
  return ref;
}

