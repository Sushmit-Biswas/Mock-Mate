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
    >
      <Card className="glass-effect mb-6">
        <CardHeader className="pb-0">
          <h3 className="text-2xl font-semibold text-center bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
            ATS Resume Analysis Results
          </h3>
        </CardHeader>
        <CardContent>
          {/* Match Score */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <h4 className="text-lg font-medium">Resume Match Score</h4>
              <span className={`text-3xl font-bold ${getMatchColor(results.matchPercentage)}`}>
                {results.matchPercentage}%
              </span>
            </div>
            <Progress 
              value={results.matchPercentage} 
              className="h-3 bg-dark-200"
              style={{
                backgroundImage: "linear-gradient(to right, #4ade80, #8b5cf6)",
                backgroundSize: `${results.matchPercentage}% 100%`,
                backgroundRepeat: "no-repeat"
              }}
            />
          </motion.div>

          {/* Profile Summary */}
          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-lg font-medium mb-2">Profile Summary</h4>
            <div className="bg-dark-200 p-4 rounded-lg">
              <p className="text-light-100">{results.profileSummary}</p>
            </div>
          </motion.div>

          {/* Missing Skills */}
          <motion.div variants={itemVariants} className="mb-6">
            <h4 className="text-lg font-medium mb-2">Missing Keywords & Skills</h4>
            {results.missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {results.missingSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-dark-200 text-light-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-green-400">Great job! Your resume covers all the key skills!</p>
            )}
          </motion.div>

          {/* Feedback & Recommendations */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-medium mb-2">Feedback & Recommendations</h4>
            <div className="bg-dark-200 p-4 rounded-lg">
              <p className="text-light-100 whitespace-pre-wrap">{results.feedback}</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResumeResults;
