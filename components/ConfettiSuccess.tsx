"use client";

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiSuccessProps {
  trigger?: boolean;
}

const ConfettiSuccess: React.FC<ConfettiSuccessProps> = ({ trigger = true }) => {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (trigger && !fired) {
      const end = Date.now() + 1000;
      
      const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853'];
      
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      setFired(true);
    }
  }, [trigger, fired]);

  return null; // This component doesn't render anything visible
};

export default ConfettiSuccess;
