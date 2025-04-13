"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarIcon, Clock, Tag } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 md:px-6 lg:pt-24 lg:pb-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-4">
            MockMate Blog
          </h1>
          <p className="text-light-100/80 max-w-2xl mx-auto text-lg">
            Expert advice, tips, and insights to help you ace your next interview and advance your career
          </p>
        </div>
        
        {/* Featured Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Link href="/blog?category=technical" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
            Technical Interviews
          </Link>
          <Link href="/blog?category=behavioral" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
            Behavioral Interviews
          </Link>
          <Link href="/blog?category=preparation" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
            Interview Preparation
          </Link>
          <Link href="/blog?category=resume" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
            Resume Building
          </Link>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="px-4 md:px-6 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-dark-300/50 rounded-xl overflow-hidden border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col">
              <div className="aspect-[16/9] relative bg-dark-400">
                <div className="w-full h-full flex items-center justify-center text-dark-300 bg-gradient-to-br from-violet-400/20 to-green-400/20">
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-light-300/30 text-sm">Featured image</span>
                  </div>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-primary-200" />
                  <span className="text-primary-200 text-xs font-medium">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 text-light-100">{post.title}</h2>
                <p className="text-light-100/70 mb-4 text-sm flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-violet-500/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden bg-dark-200 relative">
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
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-light-400" />
                      <span className="text-light-400 text-xs">{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${post.id}`} className="block py-3 text-center text-primary-200 font-medium border-t border-violet-500/20 hover:bg-violet-500/10 transition-colors">
                Read Article →
              </Link>
            </article>
          ))}
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-20 p-8 rounded-xl bg-gradient-to-r from-dark-400/80 to-dark-300/80 border border-violet-500/30 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-3">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-light-100/80 mb-6">
            Get the latest interview tips, career advice, and MockMate updates delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-dark-100/70 text-light-100 border border-violet-500/30 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
            <button className="bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-2 px-6 rounded-lg whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
