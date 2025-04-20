"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Custom SVG paths
const statIcons = {
  users: "/icons/active-users.svg",
  interviews: "/icons/interviews-conducted.svg",
  success: "/icons/success-stories.svg",
  partners: "/icons/industry-partners.svg",
};

const StatisticsSection = () => {
  const statistics = [
    { 
      icon: statIcons.users,
      label: "Active Users", 
      value: 15000, 
      suffix: "+",
      description: "Skilled professionals",
      color: "from-green-400 to-green-600"
    },
    { 
      icon: statIcons.interviews,
      label: "Interviews Done", 
      value: 120000, 
      suffix: "+",
      description: "Practice sessions completed",
      color: "from-violet-400 to-purple-600"
    },
    { 
      icon: statIcons.success,
      label: "Success Stories", 
      value: 5000, 
      suffix: "+",
      description: "Jobs secured with our help",
      color: "from-blue-400 to-blue-600"
    },
    { 
      icon: statIcons.partners,
      label: "Industry Partners", 
      value: 150, 
      suffix: "+",
      description: "Top companies trust us",
      color: "from-amber-400 to-amber-600"
    },
  ];

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-16 px-4 md:px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
          MockMate by the Numbers
        </h2>
        <p className="text-light-100/80 max-w-2xl mx-auto text-lg">
          Join thousands of users who are transforming their interview skills and career prospects
        </p>
      </div>

      <div 
        ref={ref} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative z-10"
      >
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dark-100/90 to-dark-200/90 rounded-2xl backdrop-blur-md shadow-xl border border-primary-200/20 group-hover:border-primary-200/40 transition-all duration-300 transform group-hover:scale-[1.02]"></div>
            
            {/* Decorative elements */}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity duration-300`}></div>
            
            <div className="relative p-8 flex flex-col items-center z-10">
              <div className="relative w-16 h-16 mb-5 transform group-hover:scale-110 transition-transform duration-300">
                <Image 
                  src={stat.icon} 
                  alt={stat.label} 
                  width={64} 
                  height={64}
                  className="object-contain"
                />
              </div>
              
              <div className="flex items-center justify-center mb-3">
                <Counter target={stat.value} inView={inView} duration={2000} />
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">{stat.suffix}</span>
              </div>
              
              <h3 className="text-base md:text-lg font-bold text-light-100 mb-2 text-center whitespace-nowrap">{stat.label}</h3>
              <p className="text-light-100/70 text-xs text-center whitespace-nowrap">{stat.description}</p>
              
              {/* Animated border on hover */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-400 to-violet-500 group-hover:w-full transition-all duration-700 rounded-b-xl"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Counter component for the animation
const Counter = ({ target, inView, duration }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef(null);
  
  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    
    countRef.current = 0;
    startTimeRef.current = null;
    
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      
      const increment = Math.min(progress / duration, 1) * target;
      countRef.current = Math.floor(increment);
      setCount(countRef.current);
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(animate);
  }, [inView, target, duration]);
  
  return <span className="text-3xl md:text-4xl font-bold text-white mr-1">{count}</span>;
};

export default StatisticsSection;
