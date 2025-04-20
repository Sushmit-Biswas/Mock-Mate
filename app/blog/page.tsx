"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Clock, Tag, Search, Home, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Blog post data (mock data)
const blogPosts = [
  {
    id: 1,
    title: "5 Common Technical Interview Mistakes and How to Avoid Them",
    excerpt: "Learn about the most common pitfalls candidates face during technical interviews and strategies to overcome them.",
    coverImage: "/blog/technical-interview.jpg",
    date: "April 10, 2025",
    readTime: "8 min read",
    category: "Technical Interviews",
    author: "Alex Johnson",
    authorImage: "/testimonials/person1.png"
  },
  {
    id: 2,
    title: "How to Answer Behavioral Questions Using the STAR Method",
    excerpt: "Master the Situation-Task-Action-Result framework to structure compelling stories during your behavioral interviews.",
    coverImage: "/blog/star-method.jpg", 
    date: "April 5, 2025",
    readTime: "6 min read",
    category: "Behavioral Interviews",
    author: "Maya Patel",
    authorImage: "/testimonials/person2.png"
  },
  {
    id: 3,
    title: "Preparing for System Design Interviews: A Comprehensive Guide",
    excerpt: "Learn how to tackle complex system design questions with confidence and showcase your architectural thinking.",
    coverImage: "/blog/system-design.jpg",
    date: "March 28, 2025",
    readTime: "12 min read",
    category: "Technical Interviews",
    author: "Carlos Rodriguez",
    authorImage: "/testimonials/person3.png"
  },
  {
    id: 4,
    title: "Remote Interview Tips: Making a Strong Impression Virtually",
    excerpt: "Optimize your setup, communication style, and presentation for successful remote interviews in today's digital workspace.",
    coverImage: "/blog/remote-interview.jpg",
    date: "March 20, 2025",
    readTime: "7 min read",
    category: "Interview Preparation",
    author: "Sarah Williams",
    authorImage: "/testimonials/person4.png"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-6">
        <div className="flex items-center text-sm text-light-400">
          <Link href="/" className="flex items-center hover:text-primary-200 transition-colors">
            <Home size={14} className="mr-1" />
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-light-100">Blog</span>
        </div>
      </div>
      
      {/* Hero Section with enhanced styling */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20 max-w-7xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Latest Insights
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6">
            MockMate Blog
          </h1>
          <p className="text-light-100/80 max-w-2xl mx-auto text-lg md:text-xl">
            Expert advice, tips, and insights to help you ace your next interview and advance your career
          </p>
        </motion.div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full py-4 px-6 pr-14 rounded-xl bg-dark-300/40 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-lg shadow-dark-400/10"
            />
            <div className="absolute right-4 top-4 text-light-400">
              <Search size={20} />
            </div>
          </div>
        </div>
        
        {/* Featured Categories with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          <Link href="/blog?category=technical" className="px-6 py-2.5 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-all duration-300 hover:scale-105">
            Technical Interviews
          </Link>
          <Link href="/blog?category=behavioral" className="px-6 py-2.5 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-all duration-300 hover:scale-105">
            Behavioral Interviews
          </Link>
          <Link href="/blog?category=preparation" className="px-6 py-2.5 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-all duration-300 hover:scale-105">
            Interview Preparation
          </Link>
          <Link href="/blog?category=resume" className="px-6 py-2.5 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-all duration-300 hover:scale-105">
            Resume Building
          </Link>
        </motion.div>
      </section>

      {/* Blog Posts Section with enhanced cards */}
      <section className="px-4 sm:px-6 lg:px-8 pb-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-dark-300/40 backdrop-blur-sm rounded-xl overflow-hidden border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col transform hover:-translate-y-1"
            >
              <div className="aspect-[16/9] relative bg-dark-400 overflow-hidden group">
                <div className="w-full h-full flex items-center justify-center text-dark-300 bg-gradient-to-br from-violet-400/20 to-green-400/20 group-hover:scale-105 transition-transform duration-700">
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-light-300/30 text-sm">Featured image</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-3 py-1 bg-dark-400/80 backdrop-blur-sm rounded-full">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-primary-200" />
                    <span className="text-light-100 text-xs">{post.readTime}</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={14} className="text-primary-200" />
                  <span className="text-primary-200 text-xs font-medium">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold mb-3 text-light-100 line-clamp-2">{post.title}</h2>
                <p className="text-light-100/70 mb-5 text-sm flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-violet-500/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-dark-200 relative">
                      <Image 
                        src={post.authorImage} 
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-light-100/80 text-xs">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <CalendarIcon size={14} className="text-light-400" />
                      <span className="text-light-400 text-xs">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${post.id}`} className="block py-4 text-center text-primary-200 font-medium border-t border-violet-500/20 hover:bg-violet-500/10 transition-colors group">
                <span className="inline-flex items-center">
                  Read Article 
                  <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
        
        {/* Newsletter Signup with enhanced styling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 p-10 rounded-2xl bg-gradient-to-r from-dark-400/90 to-dark-300/90 border border-violet-500/30 text-center max-w-3xl mx-auto shadow-xl backdrop-blur-sm"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/20 flex items-center justify-center">
            <span className="text-3xl">📫</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-light-100/80 mb-8 max-w-md mx-auto">
            Get the latest interview tips, career advice, and MockMate updates delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-dark-100/70 text-light-100 border border-violet-500/30 rounded-lg px-5 py-3 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-inner"
            />
            <button className="bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-3 px-6 rounded-lg whitespace-nowrap shadow-lg hover:shadow-violet-500/30">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
