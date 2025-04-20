"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mic, MicOff, PhoneOff } from 'lucide-react';

interface EnhancedCallButtonProps {
  onClick: () => void;
  isActive?: boolean;
  isListening?: boolean;
  type?: 'start' | 'end' | 'mute';
  className?: string;
}

/**
 * EnhancedCallButton component for call actions with animations and effects.
 * 
 * @param {function} onClick - Function to call when button is clicked.
 * @param {boolean} isActive - Indicates if the button is in active state.
 * @param {boolean} isListening - Indicates if the button is in listening state.
 * @param {string} type - Type of button ('start', 'end', 'mute').
 * @param {string} className - Additional class names for styling.
 */


const EnhancedCallButton = ({ 
  onClick, 
  isActive = false, 
  isListening = false,
  type = 'start',
  className = ''
}: EnhancedCallButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = () => {
    if (type === 'start') return <Phone className="h-6 w-6" />;
    if (type === 'end') return <PhoneOff className="h-6 w-6" />;
    if (type === 'mute') return isListening ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />;
    return <Phone className="h-6 w-6" />;
  };
  
  const getButtonClass = () => {
    if (type === 'start') return 'bg-green-500 hover:bg-green-600';
    if (type === 'end') return 'bg-red-500 hover:bg-red-600';
    if (type === 'mute') return isListening 
      ? 'bg-blue-500 hover:bg-blue-600' 
      : 'bg-gray-500 hover:bg-gray-600';
    return 'bg-green-500 hover:bg-green-600';
  };
  
  // Animation for active state pulses
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  // Animation for hover state
  const hoverAnimation = isHovered ? {
    scale: 1.1,
    transition: { duration: 0.2 }
  } : {};
  
  // Animation for press state
  const tapAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 }
  };
  
  // Combine animations
  const buttonAnimation = isActive ? pulseAnimation : {};
  
  return (
    <motion.button
      className={`relative rounded-full p-4 text-white shadow-lg ${getButtonClass()} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      animate={buttonAnimation}
    >
      {/* Background glow effect */}
      {isActive && (
        <motion.div 
          className="absolute inset-0 rounded-full opacity-50"
          initial={{ boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.4)' }}
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(255, 255, 255, 0.4)',
              '0 0 0 15px rgba(255, 255, 255, 0)',
              '0 0 0 0 rgba(255, 255, 255, 0)'
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {/* Ripple effect for click */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="ringing-animation"></span>
      </span>
      
      {getIcon()}
      
      {/* Audio wave animation when active */}
      {isActive && isListening && (
        <div className="absolute -right-1 -top-1">
          <div className="relative w-3 h-3">
            <motion.div
              className="absolute inset-0 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0.3, 0.7]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      )}
    </motion.button>
  );
};

export default EnhancedCallButton;
