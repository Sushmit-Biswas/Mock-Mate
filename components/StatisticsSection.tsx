"use client";

import { useEffect, useState, useRef } from "react";
import { Users, MessageSquare, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StatisticsSection = () => {
  const statistics = [
    { icon: <Users size={48} />, label: "Active Users", value: 15000, suffix: "+" },
    { icon: <MessageSquare size={48} />, label: "Interviews Conducted", value: 120000, suffix: "+" },
    { icon: <Award size={48} />, label: "Success Stories", value: 5000, suffix: "+" },
    { icon: <TrendingUp size={48} />, label: "Industry Partners", value: 150, suffix: "+" },
  ];

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section className="py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
          MockMate by the Numbers
        </h2>
        <p className="text-light-100/80 max-w-2xl mx-auto">
          Join thousands of users who are transforming their interview skills and career prospects
        </p>
      </div>

      <div 
        ref={ref} 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-dark-100/30 p-8 shadow-xl border border-primary-200/20"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col items-center justify-center relative z-10">
              <div className="text-primary-200 mb-4">
                {stat.icon}
              </div>
              <Counter target={stat.value} inView={inView} duration={2000} />
              <span className="text-5xl font-bold text-primary-200">{stat.suffix}</span>
              <p className="mt-2 text-light-100/80">{stat.label}</p>
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
  
  return <span className="text-5xl font-bold text-white">{count}</span>;
};

export default StatisticsSection;
