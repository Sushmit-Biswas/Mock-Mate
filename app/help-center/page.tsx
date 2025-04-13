"use client";

import React from 'react';
import Link from 'next/link';
import { 
  LifeBuoy, 
  MessageSquare, 
  FileQuestion,
  Headphones,
  BookOpen, 
  Mail, 
  Phone,
  Video,
  Clock,
  PenTool
} from 'lucide-react';

export default function HelpCenterPage() {
  // Support category cards data
  const supportCategories = [
    {
      title: "Getting Started",
      description: "New to MockMate? Learn the basics of setting up your account and starting your first interview.",
      icon: <LifeBuoy size={24} className="text-violet-400" />,
      link: "/help-center/getting-started"
    },
    {
      title: "Interview Troubleshooting",
      description: "Having issues with your interview sessions? Find solutions to common problems.",
      icon: <FileQuestion size={24} className="text-green-400" />,
      link: "/help-center/interview-troubleshooting"
    },
    {
      title: "Resume Checker Help",
      description: "Learn how to get the most accurate analysis and improve your resume effectively.",
      icon: <PenTool size={24} className="text-blue-400" />,
      link: "/help-center/resume-checker"
    },
    {
      title: "Account & Billing",
      description: "Manage your account settings, subscriptions, and payment information.",
      icon: <Clock size={24} className="text-orange-400" />,
      link: "/help-center/account-billing"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides on using MockMate's features effectively.",
      icon: <Video size={24} className="text-red-400" />,
      link: "/help-center/tutorials"
    },
    {
      title: "FAQs",
      description: "Browse our frequently asked questions for quick answers.",
      icon: <MessageSquare size={24} className="text-yellow-400" />,
      link: "/faqs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4 md:px-6 lg:pt-24 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6">
            How Can We Help You?
          </h1>
          <p className="text-light-100/80 text-lg mb-8">
            Find the resources and support you need to get the most out of MockMate
          </p>
          
          {/* Search Bar */}
          <div className="max-w-lg mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full py-4 px-5 pr-12 rounded-lg bg-dark-300/50 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
              <svg
                className="absolute right-4 top-4 h-6 w-6 text-light-400"
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
          
          {/* Common Questions */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Link href="/help-center/getting-started" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
              How to start my first interview?
            </Link>
            <Link href="/help-center/resume-checker" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
              How to use the resume checker?
            </Link>
            <Link href="/help-center/account-billing" className="px-4 py-2 rounded-full border border-violet-500/30 bg-dark-300/50 text-primary-200 hover:bg-violet-500/20 transition-colors duration-300">
              Manage subscription
            </Link>
          </div>
        </div>
      </section>

      {/* Support Categories Grid */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <Link 
                href={category.link} 
                key={index}
                className="bg-dark-300/50 rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-dark-400/60 group-hover:bg-dark-400 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-light-100">{category.title}</h3>
                </div>
                <p className="text-light-100/70 mb-4">{category.description}</p>
                <span className="text-primary-200 font-medium group-hover:text-violet-400 transition-colors duration-300 flex items-center gap-1">
                  Learn more 
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path d="M6.5 12L10.5 8L6.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-dark-400/80 to-dark-300/80 rounded-xl p-8 md:p-10 border border-violet-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
                  Can't find what you need?
                </h2>
                <p className="text-light-100/80 mb-6">
                  Our support team is here to help. Contact us through your preferred channel and we'll get back to you as soon as possible.
                </p>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Mail size={20} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Email Support</p>
                      <p className="text-light-100">support@mockmate.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Phone size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Phone Support</p>
                      <p className="text-light-100">+1 (555) 123-4567</p>
                      <p className="text-xs text-light-400">Mon-Fri: 9AM-6PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Headphones size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Live Chat</p>
                      <p className="text-light-100">Available 24/7 for Premium Users</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-dark-400/50 rounded-lg p-6 border border-violet-500/20">
                <h3 className="text-xl font-semibold mb-4 text-light-100">Send us a message</h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full py-2 px-3 rounded bg-dark-300 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full py-2 px-3 rounded bg-dark-300 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="issue">
                      Issue Type
                    </label>
                    <select
                      id="issue"
                      className="w-full py-2 px-3 rounded bg-dark-300 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    >
                      <option>Technical Problem</option>
                      <option>Account Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="w-full py-2 px-3 rounded bg-dark-300 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      rows={4}
                      placeholder="Describe your issue or question..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
