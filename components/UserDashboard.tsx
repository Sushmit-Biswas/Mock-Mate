"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Clock, Award, TrendingUp, 
  BarChart2, ArrowRight, ChevronRight,
  Lightbulb, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Import types
import { InterviewWithDetails } from "@/app/(root)/page";

interface UserDashboardProps {
  userInterviews: InterviewWithDetails[];
  allInterviews: InterviewWithDetails[];
  userName: string;
}

interface SkillProgress {
  name: string;
  score: number;
  color: string;
}

interface ImprovementSuggestion {
  text: string;
  frequency: number;
}

const UserDashboard = ({ userInterviews, allInterviews, userName }: UserDashboardProps) => {
  const [skillsProgress, setSkillsProgress] = useState<SkillProgress[]>([]);
  const [improvements, setImprovements] = useState<string[]>([]);
  const [interviewStats, setInterviewStats] = useState({
    completed: 0,
    pending: 0,
    retake: 0,
    averageScore: 0,
  });

  // Calculate stats from ALL interviews (both user and others)
  useEffect(() => {
    // Combine all interviews for comprehensive stats
    const combinedInterviews = [...userInterviews, ...allInterviews.filter(i => 
      !userInterviews.some(ui => ui.id === i.id)
    )];
    
    if (!combinedInterviews.length) return;

    // Basic interview stats (stick to user interviews for personal stats)
    const completed = userInterviews.filter(interview => interview.feedback).length;
    const pending = userInterviews.filter(interview => !interview.feedback).length;
    const retake = userInterviews.filter(
      interview => interview.feedback && interview.feedback.totalScore < 70
    ).length;
    
    // Calculate average score based on ALL interviews (both user and others)
    const completedCombined = combinedInterviews.filter(interview => interview.feedback).length;
    const totalScoreCombined = combinedInterviews
      .filter(interview => interview.feedback)
      .reduce((sum, interview) => sum + (interview.feedback?.totalScore || 0), 0);
    
    const averageScore = completedCombined > 0 ? Math.round(totalScoreCombined / completedCombined) : 0;
    
    setInterviewStats({
      completed,
      pending,
      retake,
      averageScore,
    });

    // Get all interviews with feedback (both user's and others) that have category scores
    const interviewsWithFeedback = combinedInterviews
      .filter(interview => interview.feedback?.categoryScores);
    
    // Calculate skills progress from ALL interviews with feedback (including other users)
    const skillScores = {};
    const skillColors = {
      "Communication Skills": "from-blue-500 to-blue-700",
      "Technical Knowledge": "from-purple-500 to-purple-700",
      "Problem Solving": "from-green-500 to-green-700",
      "Cultural Fit": "from-amber-500 to-amber-700",
      "Confidence and Clarity": "from-pink-500 to-pink-700",
    };
    
    interviewsWithFeedback.forEach(interview => {
      if (!interview.feedback?.categoryScores) return;
      
      interview.feedback.categoryScores.forEach(category => {
        if (!skillScores[category.name]) {
          skillScores[category.name] = { total: 0, count: 0 };
        }
        skillScores[category.name].total += category.score;
        skillScores[category.name].count += 1;
      });
    });
    
    const progressData = Object.entries(skillScores).map(([name, data]: [string, any]) => ({
      name,
      score: Math.round(data.total / data.count),
      color: skillColors[name] || "from-gray-500 to-gray-700"
    }));
    
    setSkillsProgress(progressData);

    // Identify top improvement areas from ALL interviews
    const allSuggestions: ImprovementSuggestion[] = [];
    
    combinedInterviews.forEach(interview => {
      if (!interview.feedback?.areasForImprovement) return;
      
      interview.feedback.areasForImprovement.forEach(area => {
        const existing = allSuggestions.find(s => s.text === area);
        if (existing) {
          existing.frequency += 1;
        } else {
          allSuggestions.push({ text: area, frequency: 1 });
        }
      });
    });
    
    // Sort by frequency and get top 3
    const topSuggestions = allSuggestions
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 3)
      .map(s => s.text);
    
    setImprovements(topSuggestions);
  }, [userInterviews, allInterviews]);

  // No data state
  if (!userInterviews.length) {
    return (
      <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-dark-100/30 p-8 shadow-xl border border-primary-200/20">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl"></div>
        
        <div className="text-center py-12 relative z-10">
          <div className="mb-6">
            <Image 
              src="/empty-state.svg" 
              alt="No interviews yet" 
              width={180} 
              height={180} 
              className="mx-auto"
            />
          </div>
          <h3 className="text-2xl font-semibold text-light-100 mb-3">
            No Interview Data Yet
          </h3>
          <p className="text-light-100/70 mb-6 max-w-md mx-auto">
            Complete your first interview to see personalized stats and recommendations.
          </p>
          <Button asChild className="btn-primary">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl backdrop-blur-md bg-dark-100/30 p-6 md:p-8 shadow-xl border border-primary-200/20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-light-100">
              Welcome back, <span className="bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">{userName}</span>
            </h2>
            <p className="text-light-100/70">Here's an overview of your interview performance</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="btn-primary">
              <Link href="/interview">New Interview</Link>
            </Button>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/50 rounded-xl p-4 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-light-100/70 text-sm">Completed</p>
                <h3 className="text-3xl font-bold text-light-100">{interviewStats.completed}</h3>
              </div>
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Award className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-dark-200/50 rounded-xl p-4 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-light-100/70 text-sm">Pending</p>
                <h3 className="text-3xl font-bold text-light-100">{interviewStats.pending}</h3>
              </div>
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-dark-200/50 rounded-xl p-4 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-light-100/70 text-sm">Need Improvement</p>
                <h3 className="text-3xl font-bold text-light-100">{interviewStats.retake}</h3>
              </div>
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-dark-200/50 rounded-xl p-4 border border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-light-100/70 text-sm">Average Score</p>
                <h3 className="text-3xl font-bold text-light-100">{interviewStats.averageScore}%</h3>
              </div>
              <div className="bg-violet-500/20 p-2 rounded-lg">
                <BarChart2 className="h-6 w-6 text-violet-500" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Skills & Improvements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Progress */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-200/50 rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-light-100">Skills Progress</h3>
              <div className="bg-dark-300/80 p-1.5 rounded-lg">
                <Target className="h-5 w-5 text-primary-200" />
              </div>
            </div>
            
            <div className="space-y-5">
              {skillsProgress.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-light-100">{skill.name}</span>
                    <span className="text-sm font-medium text-light-100">{skill.score}%</span>
                  </div>
                  <div className="w-full bg-dark-400/50 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full bg-gradient-to-r ${skill.color}`}
                      style={{ width: `${skill.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Suggested Improvements */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-200/50 rounded-xl p-6 border border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-light-100">Suggested Improvements</h3>
              <div className="bg-dark-300/80 p-1.5 rounded-lg">
                <Lightbulb className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            
            {improvements.length > 0 ? (
              <div className="space-y-4">
                {improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-dark-300/30 rounded-lg">
                    <div className="mt-0.5 bg-amber-500/20 p-1.5 rounded-full">
                      <ChevronRight className="h-4 w-4 text-amber-500" />
                    </div>
                    <p className="text-sm text-light-100/90">{improvement}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-light-100/70">Complete more interviews to get personalized suggestions</p>
              </div>
            )}
            
            <div className="mt-4 pt-4 border-t border-gray-800">
              <Link 
                href="/guides" 
                className="text-primary-200 hover:text-violet-400 text-sm font-medium flex items-center justify-center gap-1"
              >
                View improvement guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
