"use client";

import React, { useState } from 'react';
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
  PenTool,
  Home,
  ChevronRight,
  MessageCircle,
  Loader,
  CheckCircle,
  X
} from 'lucide-react';

/**
 * Help Center Page Component
 * 
 * Comprehensive support page featuring:
 * - FAQ categories and links
 * - Support article search
 * - Contact form with validation
 * - Live chat widget
 */
export default function HelpCenterPage() {
  // Form state management for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issue: 'Technical Problem',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [showChat, setShowChat] = useState(false);

  // Support category cards data with icons and descriptions
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

  /**
   * Handles input changes in the contact form
   * Updates form state and clears related error messages
   * 
   * @param e - Input change event
   */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: null
      }));
    }
  };

  /**
   * Validates form inputs before submission
   * Checks for empty fields and valid email format
   * 
   * @returns {boolean} - Whether the form is valid
   */
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form submission
   * Validates inputs, shows loading state, and displays success/error messages
   * 
   * @param e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        issue: 'Technical Problem',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Auto-hide status message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200">
      {/* Breadcrumb Navigation for improved site navigation */}
      <div className="max-w-6xl mx-auto pt-6 px-4 md:px-6">
        <div className="flex items-center text-sm text-light-400">
          <Link href="/" className="flex items-center hover:text-primary-200 transition-colors">
            <Home size={14} className="mr-1" />
            Home
          </Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-light-100">Help Center</span>
        </div>
      </div>
      
      {/* Hero Section with search functionality */}
      <section className="relative pt-16 pb-12 px-4 md:px-6 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6 animate-fadeIn">
            How Can We Help You?
          </h1>
          <p className="text-light-100/80 text-lg mb-8">
            Find the resources and support you need to get the most out of MockMate
          </p>
          
          {/* Search Bar for finding help articles */}
          <div className="max-w-lg mx-auto mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                className="w-full py-4 px-5 pr-12 rounded-lg bg-dark-300/50 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-300"
                aria-label="Search help articles"
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
          
          {/* Quick access links to common questions */}
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

      {/* Support Categories Grid with visual navigation cards */}
      <section className="px-4 md:px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-light-100 mb-8 text-center md:text-left">Support Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportCategories.map((category, index) => (
              <Link 
                href={category.link} 
                key={index}
                className="bg-dark-300/50 rounded-xl p-6 border border-violet-500/20 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 group hover:-translate-y-1"
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

      {/* Contact Support section with multiple contact options and form */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-dark-400/80 to-dark-300/80 rounded-xl p-8 md:p-10 border border-violet-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Contact options column */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
                  Can't find what you need?
                </h2>
                <p className="text-light-100/80 mb-6">
                  Our support team is here to help. Contact us through your preferred channel and we'll get back to you as soon as possible.
                </p>
                <div className="flex flex-col space-y-4">
                  {/* Email contact info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-400/40 transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Mail size={20} className="text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Email Support</p>
                      <p className="text-light-100">support@mockmate.com</p>
                    </div>
                  </div>
                  {/* Phone contact info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-400/40 transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Phone size={20} className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Phone Support</p>
                      <p className="text-light-100">+91 1234567890</p>
                      <p className="text-xs text-light-400">Mon-Fri: 9AM-6PM IST</p>
                    </div>
                  </div>
                  {/* Live chat info */}
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-dark-400/40 transition-colors duration-300">
                    <div className="p-2 rounded-lg bg-dark-400/60">
                      <Headphones size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-light-400">Live Chat</p>
                      <p className="text-light-100">Available 24/7 for All Users</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form with validation and feedback */}
              <div className="bg-dark-400/50 rounded-lg p-6 border border-violet-500/20">
                <h3 className="text-xl font-semibold mb-4 text-light-100">Send us a message</h3>
                
                {/* Success message display */}
                {submitStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center">
                    <CheckCircle size={20} className="text-green-400 mr-2" />
                    <span className="text-light-100">Your message has been sent successfully!</span>
                    <button onClick={() => setSubmitStatus(null)} className="ml-auto text-light-400 hover:text-light-100">
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {/* Error message display */}
                {submitStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
                    <X size={20} className="text-red-400 mr-2" />
                    <span className="text-light-100">Failed to send message. Please try again.</span>
                    <button onClick={() => setSubmitStatus(null)} className="ml-auto text-light-400 hover:text-light-100">
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {/* Contact form with input validation */}
                <form onSubmit={handleSubmit}>
                  {/* Name input field */}
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="name">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full py-2 px-3 rounded bg-dark-300 text-light-100 border ${formErrors.name ? 'border-red-500' : 'border-violet-500/30'} focus:outline-none focus:ring-2 focus:ring-violet-500/50`}
                      placeholder="Your name"
                    />
                    {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  {/* Email input field with validation */}
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="email">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full py-2 px-3 rounded bg-dark-300 text-light-100 border ${formErrors.email ? 'border-red-500' : 'border-violet-500/30'} focus:outline-none focus:ring-2 focus:ring-violet-500/50`}
                      placeholder="Your email"
                    />
                    {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  {/* Issue type selection */}
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="issue">
                      Issue Type
                    </label>
                    <select
                      id="issue"
                      value={formData.issue}
                      onChange={handleInputChange}
                      className="w-full py-2 px-3 rounded bg-dark-300 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    >
                      <option>Technical Problem</option>
                      <option>Account Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Other</option>
                    </select>
                  </div>
                  {/* Message textarea */}
                  <div className="mb-4">
                    <label className="block text-light-100/80 text-sm mb-2" htmlFor="message">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full py-2 px-3 rounded bg-dark-300 text-light-100 border ${formErrors.message ? 'border-red-500' : 'border-violet-500/30'} focus:outline-none focus:ring-2 focus:ring-violet-500/50`}
                      rows={4}
                      placeholder="Describe your issue or question..."
                    />
                    {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
                  </div>
                  {/* Submit button with loading state */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-all text-white font-medium rounded flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={18} className="animate-spin mr-2" />
                        Sending...
                      </>
                    ) : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sticky Chat Button for quick support access */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setShowChat(!showChat)}
          className="p-4 rounded-full bg-violet-500 hover:bg-violet-600 text-white shadow-lg shadow-violet-500/30 flex items-center justify-center transition-all duration-300 group"
          aria-label="Chat with support"
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
        </button>
        
        {/* Chat popup that appears when chat button is clicked */}
        {showChat && (
          <div className="absolute bottom-16 right-0 w-80 p-4 bg-dark-300 rounded-lg shadow-lg border border-violet-500/30 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-light-100">Live Support</h4>
              <button onClick={() => setShowChat(false)} className="text-light-400 hover:text-light-100">
                <X size={16} />
              </button>
            </div>
            <p className="text-light-100/80 text-sm mb-4">Connect with our support team instantly.</p>
            <button className="w-full py-2 bg-violet-500 hover:bg-violet-600 text-white rounded font-medium transition-colors">
              Start Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
