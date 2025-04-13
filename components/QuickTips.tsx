"use client";

import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { cn } from "@/lib/utils"; // Import cn

const interviewTips = [
  "Use the STAR method (Situation, Task, Action, Result) when answering behavioral questions.",
  "Research the company before your interview to understand their values and culture.",
  "Prepare questions to ask your interviewer to show your interest in the position.",
  "Practice explaining technical concepts in simple terms to demonstrate your communication skills.",
  "Take a moment to gather your thoughts before answering difficult questions.",
  "Match your body language to convey confidence: sit up straight, maintain eye contact, and smile.",
  "When discussing past mistakes, focus on what you learned and how you improved.",
  "Quantify your accomplishments with specific numbers or percentages when possible.",
  "Listen carefully to the interviewer's questions before responding.",
  "Be concise in your responses, aiming for answers that are 1-2 minutes long.",
  "Prepare examples of how you've overcome challenges in previous roles.",
  "Show enthusiasm for the role and company throughout the interview.",
  "Practice speaking at a moderate pace, neither too fast nor too slow.",
  "Connect your skills and experiences directly to the job requirements.",
  "End your interview by reiterating your interest in the position."
];

interface QuickTipsProps {
  className?: string;
}

const QuickTips: React.FC<QuickTipsProps> = ({ className }) => {
  // Initialize state with a random tip
  const [tipIndex, setTipIndex] = useState(() => Math.floor(Math.random() * interviewTips.length));

  // Change tip every 15 seconds
  useEffect(() => {
    console.log("QuickTips component mounted."); // Add log
    const interval = setInterval(() => {
      setTipIndex(prevIndex => (prevIndex + 1) % interviewTips.length);
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const currentTip = interviewTips[tipIndex];

  return (
    <div className={cn("bg-dark-300 border border-primary-200/30 rounded-lg p-4 overflow-hidden", className)}>
      <div className="flex gap-3 items-start">
        <Lightbulb className="text-primary-200 mt-0.5 flex-shrink-0" size={20} />
        <div className="flex-1">
          <h4 className="text-primary-200 text-sm font-semibold mb-1">Interview Tip</h4>
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex} // Use index as key for animation trigger
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-white/80 text-sm"
            >
              {currentTip}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
