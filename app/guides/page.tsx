"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Code, 
  BriefcaseBusiness, 
  MessageSquareText, 
  Lightbulb, 
  ArrowRightIcon,
  Star,
  Clock,
  TrendingUp,
  Search,
  Home,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Guide category data
  const guideCategories = [
    {
      title: "Technical Interviews",
      description: "Master coding challenges, system design questions, and technical concepts",
      icon: <Code size={24} className="text-purple-400" />,
      color: "border-purple-500/30",
      guides: [
        {
          title: "Data Structures & Algorithms",
          description: "Learn the fundamentals of solving algorithmic problems",
          difficulty: "Intermediate",
          timeToRead: "20 min",
          isPopular: true,
          path: "/guides/data-structures-algorithms"
        },
        {
          title: "System Design Interview Basics",
          description: "How to approach architecture and scaling questions",
          difficulty: "Advanced",
          timeToRead: "25 min",
          isPopular: true,
          path: "/guides/system-design-basics"
        },
        {
          title: "Front-End Technical Interviews",
          description: "CSS, JavaScript, and framework-specific questions",
          difficulty: "Intermediate",
          timeToRead: "18 min",
          isPopular: false,
          path: "/guides/frontend-interviews"
        }
      ]
    },
    {
      title: "Behavioral Interviews",
      description: "Structure compelling stories and showcase your soft skills effectively",
      icon: <MessageSquareText size={24} className="text-green-400" />,
      color: "border-green-500/30",
      guides: [
        {
          title: "The STAR Method Explained",
          description: "Structure your answers for maximum impact",
          difficulty: "Beginner",
          timeToRead: "12 min",
          isPopular: true,
          path: "/guides/star-method"
        },
        {
          title: "Answering Leadership Questions",
          description: "Showcase your management and team skills",
          difficulty: "Intermediate",
          timeToRead: "15 min",
          isPopular: false,
          path: "/guides/leadership-questions"
        },
        {
          title: "Navigating Cultural Fit Questions",
          description: "How to demonstrate alignment with company values",
          difficulty: "Beginner",
          timeToRead: "10 min",
          isPopular: false,
          path: "/guides/cultural-fit"
        }
      ]
    },
    {
      title: "Role-Specific Guides",
      description: "Tailored preparation resources for different positions and industries",
      icon: <BriefcaseBusiness size={24} className="text-blue-400" />,
      color: "border-blue-500/30",
      guides: [
        {
          title: "Software Engineering Interview Guide",
          description: "From junior to senior level positions",
          difficulty: "All Levels",
          timeToRead: "30 min",
          isPopular: true,
          path: "/guides/software-engineering"
        },
        {
          title: "Product Management Interview Guide",
          description: "Strategy, execution, and analysis questions",
          difficulty: "Intermediate",
          timeToRead: "22 min",
          isPopular: true,
          path: "/guides/product-management"
        },
        {
          title: "Data Science Interview Preparation",
          description: "Statistics, ML concepts, and case studies",
          difficulty: "Advanced",
          timeToRead: "25 min",
          isPopular: false,
          path: "/guides/data-science"
        }
      ]
    },
    {
      title: "Interview Strategy",
      description: "Tactics and approaches to stand out from other candidates",
      icon: <Lightbulb size={24} className="text-amber-400" />,
      color: "border-amber-500/30",
      guides: [
        {
          title: "Questions to Ask Your Interviewer",
          description: "Impress with thoughtful, strategic questions",
          difficulty: "All Levels",
          timeToRead: "8 min",
          isPopular: true,
          path: "/guides/questions-to-ask"
        },
        {
          title: "Salary Negotiation Strategies",
          description: "Get the compensation package you deserve",
          difficulty: "Intermediate",
          timeToRead: "15 min",
          isPopular: true,
          path: "/guides/salary-negotiation"
        },
        {
          title: "Remote Interview Success Tactics",
          description: "Stand out in virtual interviews",
          difficulty: "Beginner",
          timeToRead: "12 min",
          isPopular: false,
          path: "/guides/remote-interviews"
        }
      ]
    }
  ];

  // Featured guides (could be editorial picks or most popular)
  const featuredGuides = [
    {
      title: "Ultimate Technical Interview Preparation Checklist",
      description: "A comprehensive roadmap covering all aspects of technical interviews from algorithms to system design and coding challenges.",
      image: "/guides/technical-checklist.jpg",
      path: "/guides/technical-interview-checklist",
      duration: "35 min read"
    },
    {
      title: "How to Answer the 10 Most Common Behavioral Questions",
      description: "Master the art of storytelling and learn frameworks for answering questions about teamwork, conflict resolution, and leadership.",
      image: "/guides/behavioral-top10.jpg",
      path: "/guides/top-10-behavioral-questions",
      duration: "20 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto pt-6 px-4 md:px-6">
        <div className="flex items-center text-sm text-light-400">
          <Link href="/" className="flex items-center hover:text-primary-200 transition-colors">
            <Home size={14} className="mr-1" />
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-light-100">Guides</span>
        </div>
      </div>
      
      {/* Hero Section with enhanced styling */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Expert Resources
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6">
            Interview Guides
          </h1>
          <p className="text-light-100/80 text-lg md:text-xl mb-10">
            Expert resources to help you prepare for and excel in any interview
          </p>
          
          {/* Enhanced Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 px-6 pr-14 rounded-xl bg-dark-300/50 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-lg shadow-dark-400/10"
              />
              <div className="absolute right-4 top-4 text-light-400">
                <Search size={20} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Guides with enhanced styling */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-violet-500/20">
              <Star size={20} className="text-violet-400" />
            </div>
            <h2 className="text-2xl font-semibold text-light-100">Featured Guides</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGuides.map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link 
                  href={guide.path} 
                  className="bg-dark-300/40 backdrop-blur-sm rounded-xl overflow-hidden border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col h-full transform hover:-translate-y-1"
                >
                  <div className="h-56 bg-gradient-to-r from-violet-500/20 to-green-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-light-300/30 text-sm">Featured image</span>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-dark-300/80 to-transparent"></div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-violet-500/20 text-violet-400 text-xs py-1.5 px-4 rounded-full font-medium">Featured</span>
                      <span className="flex items-center gap-1.5 text-light-400 text-sm">
                        <Clock size={14} />
                        {guide.duration}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-light-100">{guide.title}</h3>
                    <p className="text-light-100/70 text-sm mb-5 flex-1">{guide.description}</p>
                    <div className="flex items-center text-primary-200 font-medium group">
                      Read guide
                      <ArrowRightIcon size={16} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Categories with enhanced styling */}
      {guideCategories.map((category, i) => (
        <motion.section 
          key={i} 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-lg bg-dark-400/60">
                {category.icon}
              </div>
              <h2 className="text-2xl font-semibold text-light-100">{category.title}</h2>
            </div>
            <p className="text-light-100/80 mb-10 max-w-2xl text-lg">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.guides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link 
                    href={guide.path} 
                    className={`bg-dark-300/40 backdrop-blur-sm rounded-xl p-6 border ${category.color} hover:border-opacity-50 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:shadow-violet-500/5 transform hover:-translate-y-1`}
                  >
                    <div className="flex justify-between mb-3">
                      <span className="bg-dark-400/60 text-light-100/90 text-xs py-1 px-3 rounded-full">
                        {guide.difficulty}
                      </span>
                      <span className="flex items-center gap-1.5 text-light-400 text-xs">
                        <Clock size={12} />
                        {guide.timeToRead}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-light-100">{guide.title}</h3>
                    <p className="text-light-100/70 text-sm mb-4 flex-1">{guide.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-200 text-sm font-medium group-hover:text-violet-400 flex items-center gap-1">
                        Read more
                        <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                      </span>
                      {guide.isPopular && (
                        <span className="flex items-center gap-1 text-amber-400 text-xs">
                          <TrendingUp size={12} />
                          Popular
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 text-right">
              <Link 
                href={`/guides/${category.title.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-primary-200 hover:text-violet-400 transition-colors flex items-center justify-end gap-1.5 text-sm font-medium group"
              >
                View all {category.title} guides
                <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.section>
      ))}

      {/* Newsletter with enhanced styling */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-dark-400/90 to-dark-300/90 rounded-2xl p-10 border border-violet-500/30 text-center shadow-xl backdrop-blur-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/20 flex items-center justify-center">
              <span className="text-3xl">✉️</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
              Get Interview Guides Delivered to Your Inbox
            </h2>
            <p className="text-light-100/80 mb-8 max-w-2xl mx-auto text-lg">
              Subscribe to our newsletter for the latest interview tips, exclusive guides, and early access to new resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-dark-100/70 text-light-100 border border-violet-500/30 rounded-lg px-5 py-3.5 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-inner"
              />
              <button className="bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-3.5 px-8 rounded-lg whitespace-nowrap shadow-lg hover:shadow-violet-500/30">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
