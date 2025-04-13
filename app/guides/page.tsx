"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Code, 
  BriefcaseBusiness, 
  MessageSquareText, 
  Lightbulb, 
  ArrowRightIcon,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function GuidesPage() {
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
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 md:px-6 lg:pt-24 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6">
            Interview Guides
          </h1>
          <p className="text-light-100/80 text-lg mb-8">
            Expert resources to help you prepare for and excel in any interview
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guides..."
                className="w-full py-3 px-5 pr-12 rounded-lg bg-dark-300/50 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <svg
                className="absolute right-4 top-3.5 h-5 w-5 text-light-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-light-100">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredGuides.map((guide, index) => (
              <Link 
                href={guide.path} 
                key={index}
                className="bg-dark-300/50 rounded-xl overflow-hidden border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col h-full"
              >
                <div className="h-48 bg-gradient-to-r from-violet-500/20 to-green-500/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-light-300/30 text-sm">Featured image</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-violet-500/20 text-violet-400 text-xs py-1 px-3 rounded-full">Featured</span>
                    <span className="flex items-center gap-1 text-light-400 text-sm">
                      <Clock size={14} />
                      {guide.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-light-100">{guide.title}</h3>
                  <p className="text-light-100/70 text-sm mb-4 flex-1">{guide.description}</p>
                  <div className="flex items-center text-primary-200 font-medium">
                    Read guide
                    <ArrowRightIcon size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Categories */}
      {guideCategories.map((category, i) => (
        <section key={i} className="px-4 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-dark-400/60">
                {category.icon}
              </div>
              <h2 className="text-2xl font-semibold text-light-100">{category.title}</h2>
            </div>
            <p className="text-light-100/80 mb-8 max-w-2xl">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.guides.map((guide, index) => (
                <Link 
                  href={guide.path} 
                  key={index}
                  className={`bg-dark-300/30 rounded-lg p-5 border ${category.color} hover:border-opacity-50 transition-all duration-300 flex flex-col h-full`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="bg-dark-400/60 text-light-100/80 text-xs py-1 px-2 rounded">
                      {guide.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-light-400 text-xs">
                      <Clock size={12} />
                      {guide.timeToRead}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-light-100">{guide.title}</h3>
                  <p className="text-light-100/70 text-sm mb-3 flex-1">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-200 text-sm font-medium">Read more</span>
                    {guide.isPopular && (
                      <span className="flex items-center gap-1 text-amber-400 text-xs">
                        <TrendingUp size={12} />
                        Popular
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-right">
              <Link href={`/guides/${category.title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary-200 hover:text-violet-400 transition-colors flex items-center justify-end gap-1 text-sm font-medium">
                View all {category.title} guides
                <ArrowRightIcon size={16} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* Newsletter */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-dark-400/80 to-dark-300/80 rounded-xl p-8 md:p-10 border border-violet-500/30 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
              Get Interview Guides Delivered to Your Inbox
            </h2>
            <p className="text-light-100/80 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest interview tips, exclusive guides, and early access to new resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-dark-100/70 text-light-100 border border-violet-500/30 rounded-lg px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <button className="bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-2.5 px-6 rounded-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
