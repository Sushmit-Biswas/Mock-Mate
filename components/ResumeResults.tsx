"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";

interface ResumeResultsProps {
  results: {
    matchPercentage: number;
    missingSkills: string[];
    feedback: string;
    profileSummary: string;
  };
}

const ResumeResults: React.FC<ResumeResultsProps> = ({ results }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delay: 0.3,
        staggerChildren: 0.2,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  // Colors for match percentage
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Card className="relative overflow-hidden backdrop-blur-md bg-dark-100/30 shadow-xl border border-primary-200/20 mb-6">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <CardHeader className="pb-0 relative z-10">
          <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
            ATS Resume Analysis Results
          </h3>
        </CardHeader>
        <CardContent className="relative z-10">
          {/* Match Score */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <h4 className="text-lg font-medium">Resume Match Score</h4>
              <span className={`text-4xl font-bold ${getMatchColor(results.matchPercentage)}`}>
                {results.matchPercentage}%
              </span>
            </div>
            
            {/* Enhanced progress bar with animation and gradient */}
            <div className="w-full h-4 bg-dark-200 rounded-full relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-violet-500"
                style={{ width: `${results.matchPercentage}%`, transition: 'width 1.5s ease-in-out' }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"></div>
              </div>
              <style jsx>{`
                @keyframes shine {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(200%); }
                }
                .shine-animation {
                  animation: shine 3s infinite;
                }
              `}</style>
            </div>
          </motion.div>

          {/* Profile Summary */}
          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-lg font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-200"></span>
              Profile Summary
            </h4>
            <div className="bg-dark-200/70 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 shadow-inner">
              <p className="text-light-100">{results.profileSummary || "(none)"}</p>
            </div>
          </motion.div>

          {/* Missing Skills */}
          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-lg font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-200"></span>
              Missing Keywords & Skills
            </h4>
            <div className="bg-dark-200/70 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 shadow-inner">              {results.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {results.missingSkills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-dark-300/80 text-light-100 border border-gray-700/50 px-3 py-1 text-sm rounded-full shadow-lg"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-green-400 font-medium">Great job! Your resume covers all the key skills!</p>
              )}
            </div>
          </motion.div>

          {/* Feedback & Recommendations */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-200"></span>
              Feedback & Recommendations
            </h4>            <div className="bg-dark-200/70 backdrop-blur-sm p-5 rounded-lg border border-gray-700/50 shadow-inner text-light-100 prose prose-invert prose-sm max-w-none">
              <ReactMarkdown 
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-xl font-bold mt-4 mb-2" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-lg font-semibold mt-3 mb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-base font-medium mt-3 mb-1" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-3 last:mb-0" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold text-primary-200" {...props} />,
                }}
              >
                {results.feedback || "(none)"}
              </ReactMarkdown>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResumeResults;
