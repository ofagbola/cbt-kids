import React, { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface OnboardingCoachProps {
  enabled?: boolean;
  onClose?: () => void;
  showEveryTime?: boolean;
}

// A simple onboarding coach that guides users to key UI areas
export default function OnboardingCoach({ enabled = false, onClose, showEveryTime = true }: OnboardingCoachProps) {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    if (showEveryTime) {
      setShow(true);
    } else {
      const seen = localStorage.getItem('onboarding_seen');
      if (!seen) setShow(true);
    }
  }, [enabled, showEveryTime]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!showEveryTime) localStorage.setItem('onboarding_seen', '1');
      setShow(false);
      onClose && onClose();
    }
  };

  const handleSkip = () => {
    if (!showEveryTime) localStorage.setItem('onboarding_seen', '1');
    setShow(false);
    onClose && onClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Dim background */}
        <div className="absolute inset-0 bg-black/30" />

        {step === 1 && <MeasuredHighlight targetSelector='[data-onboard="sidebar"]' />}
        {step === 1 && <CoachLabel targetSelector='[data-onboard="sidebar"]'>Tap an icon</CoachLabel>}

        {step === 2 && <MeasuredHighlight targetSelector='[data-onboard="lessons"]' />}
        {step === 2 && <CoachLabel targetSelector='[data-onboard="lessons"]'>Pick a lesson</CoachLabel>}

        {step === 3 && <MeasuredHighlight targetSelector='[data-onboard="chatbar"]' />}
        {step === 3 && <CoachLabel targetSelector='[data-onboard="chatbar"]'>Type or talk here</CoachLabel>}

        {/* Coach bubble */}
        <motion.div
          className="absolute right-8 top-8 max-w-sm pointer-events-auto"
          initial={{ y: -10, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: [1, 1.04, 1] }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="p-4 rounded-2xl text-gray-800"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div className="text-lg font-semibold font-subheading">Hi there! 👋</div>
            <div className="text-sm mt-1">
              {step === 0 && 'Welcome! I will show you around.'}
              {step === 1 && 'This is the sidebar — tap an icon to navigate.'}
              {step === 2 && 'Choose a CBT lesson to begin.'}
              {step === 3 && 'Type or talk to me in the chat bar!'}
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={handleSkip} variant="outline">Skip</Button>
              <Button size="sm" onClick={handleNext} className="bg-blue-500 hover:bg-blue-600">
                {step < 3 ? 'Next' : 'Done'}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function useTargetRect(selector: string) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    const update = () => {
      const el = document.querySelector(selector) as HTMLElement | null;
      if (el) setRect(el.getBoundingClientRect());
    };
    update();
    window.addEventListener('resize', update);
    const id = window.setInterval(update, 300);
    return () => { window.removeEventListener('resize', update); window.clearInterval(id); };
  }, [selector]);
  return rect;
}

function MeasuredHighlight({ targetSelector }: { targetSelector: string }) {
  const rect = useTargetRect(targetSelector);
  if (!rect) return null;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: rect.left,
    top: rect.top,
    width: rect.width,
    height: rect.height,
    borderRadius: 12,
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.3), 0 0 0 3px rgba(255,255,255,0.6)',
    pointerEvents: 'none'
  };
  return <motion.div className="pointer-events-none" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} style={style} />;
}

function CoachLabel({ targetSelector, children }: { targetSelector: string; children: React.ReactNode }) {
  const rect = useTargetRect(targetSelector);
  if (!rect) return null;
  const style: React.CSSProperties = {
    position: 'fixed',
    left: rect.right + 12,
    top: rect.top,
    color: 'white'
  };
  return (
    <motion.div className="pointer-events-none" initial={{opacity:0, y:-6}} animate={{opacity:1, y:0}} style={style}>
      <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.2 }} className="flex items-center gap-2">
        <ChevronRight className="w-6 h-6" />
        <span className="text-sm">{children}</span>
      </motion.div>
    </motion.div>
  );
}

