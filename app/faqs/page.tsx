"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Home, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// FAQ Item component with enhanced animations and styling
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-violet-500/20 last:border-b-0 group">
      <button
        className="flex justify-between items-center w-full py-6 px-4 text-left hover:bg-dark-200/30 transition-colors rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-light-100 group-hover:text-primary-200 transition-colors">{question}</h3>
        <div className={`text-violet-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="prose prose-invert max-w-none text-light-100/80 px-4 pb-6">
              <p>{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// FAQ category section with enhanced styling
const FAQCategory = ({ title, faqs, iconEmoji }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl" role="img" aria-label={title}>{iconEmoji}</span>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="bg-dark-300/50 rounded-xl border border-violet-500/20 shadow-xl shadow-dark-400/10 backdrop-blur-sm">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </motion.div>
  );
};

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqData, setFilteredFaqData] = useState([]);
  
  // FAQ data organized by categories - updated to match README
  const faqData = [
    {
      category: "General Questions",
      iconEmoji: "🤔",
      faqs: [
        {
          question: "What is MockMate?",
          answer: "MockMate is an AI-powered interview preparation platform that provides realistic mock interviews with instant feedback. Our AI interviewer asks questions tailored to your target role and provides constructive criticism to help you improve your interviewing skills."
        },
        {
          question: "Is MockMate free to use?",
          answer: "Yes, MockMate is currently free for use for all users. Enjoy full access to its features without any cost, with premium options potentially available in the future."
        },
        {
          question: "What makes MockMate different from other interview prep tools?",
          answer: "MockMate offers realistic voice-based conversations with AI rather than just text prompts. Our platform provides detailed feedback on your answers, including content analysis, delivery assessment, and specific improvement suggestions. We also offer a resume checker tool to optimize your job applications."
        },
        {
          question: "Do I need to create an account to use MockMate?",
          answer: "Yes, you need to create a free account to access our interview simulations and save your progress. Creating an account allows you to track your performance over time and receive personalized recommendations."
        }
      ]
    },
    {
      category: "Technical Details",
      iconEmoji: "⚙️",
      faqs: [
        {
          question: "What browsers does MockMate support?",
          answer: "MockMate works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend using the latest version of these browsers for optimal performance."
        },
        {
          question: "Do I need a microphone to use MockMate?",
          answer: "Yes, you'll need a working microphone for the voice-based interview feature. We also recommend using headphones for a better audio experience. However, you can still access text-based interview simulations if you don't have a microphone."
        },
        {
          question: "How does MockMate's AI understand and evaluate my answers?",
          answer: "MockMate leverages highly advanced and highly sophisticated Gemini AI models, trusted by everyone, to thoroughly analyze your responses. These models assess content relevance, structure, clarity, and technical accuracy to provide detailed, personalized feedback."
        },
        {
          question: "Can I use MockMate on mobile devices?",
          answer: "Yes, MockMate is fully responsive and works on mobile devices. However, for the best interview simulation experience, we recommend using a desktop or laptop computer with a stable internet connection."
        }
      ]
    },
    {
      category: "Interview Preparation",
      iconEmoji: "🎯",
      faqs: [
        {
          question: "What types of interviews does MockMate support?",
          answer: "MockMate supports various interview types including technical interviews for software engineers, behavioral interviews, leadership/management interviews, and role-specific interviews for positions in marketing, sales, finance, and more."
        },
        {
          question: "How should I prepare before using MockMate?",
          answer: "We recommend having a clear idea of the role you're interviewing for, reviewing your resume, and being in a quiet environment free from distractions. It's also helpful to have specific technical or industry topics you'd like to focus on."
        },
        {
          question: "How long does a typical interview session last?",
          answer: "A standard interview session typically lasts between 15-30 minutes, depending on the interview type and your response length. You can also configure shorter practice sessions focusing on specific question types."
        },
        {
          question: "Where can I find interview guides and resources?",
          answer: "MockMate provides comprehensive resources covering common questions, strategies, and industry-specific tips in our Interview Guides section. These guides are designed to help you understand what recruiters are looking for and how to structure effective responses."
        }
      ]
    },
    {
      category: "Resume Checker",
      iconEmoji: "📝",
      faqs: [
        {
          question: "How does the Resume Checker work?",
          answer: "Our Resume Checker analyzes your resume against industry standards and job descriptions. It evaluates formatting, keyword optimization, content strength, and provides actionable suggestions to improve your resume's effectiveness."
        },
        {
          question: "What file formats are supported for resume uploads?",
          answer: "The Resume Checker supports PDF, DOCX, and TXT file formats. We recommend using PDF for the most accurate analysis of your resume's formatting and layout."
        },
        {
          question: "How long does it take to receive resume feedback?",
          answer: "Resume analysis is typically completed within a few minutes. The system scans your document, compares it to our database of successful resumes, and generates personalized recommendations almost instantly."
        },
        {
          question: "Is my resume data kept private?",
          answer: "Yes, we take your privacy seriously. Your resume data is encrypted and used solely for analysis purposes. We do not share your personal information or resume content with third parties without your consent. Please see our Privacy Policy for more details."
        }
      ]
    }
  ];

  // Filter FAQs based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredFaqData(faqData);
      return;
    }

    const filtered = faqData.map(category => {
      const filteredFaqs = category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      return {
        ...category,
        faqs: filteredFaqs
      };
    }).filter(category => category.faqs.length > 0);
    
    setFilteredFaqData(filtered);
  }, [searchQuery]);

  // Initialize filtered data
  useEffect(() => {
    setFilteredFaqData(faqData);
  }, []);

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
          <span className="text-light-100">FAQs</span>
        </div>
      </div>
      
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with improved spacing */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-light-100/80 max-w-2xl mx-auto text-lg">
              Find answers to common questions about MockMate's interview simulation platform, 
              resume checker, and other features.
            </p>
          </motion.div>

          {/* Search Bar with enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <div className="max-w-lg mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 px-5 pr-12 rounded-xl bg-dark-300/50 text-light-100 border border-violet-500/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 shadow-lg"
                />
                <svg
                  className="absolute right-4 top-4 h-5 w-5 text-light-400"
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
          </motion.div>

          {/* FAQ Categories with search results messaging */}
          {filteredFaqData.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl text-light-100 mb-2">No results found</h3>
              <p className="text-light-100/70">Try searching with different keywords</p>
            </div>
          ) : (
            filteredFaqData.map((category, index) => (
              <FAQCategory
                key={index}
                title={category.category}
                faqs={category.faqs}
                iconEmoji={category.iconEmoji}
              />
            ))
          )}

          {/* Still Have Questions - enhanced styling */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-20 text-center p-10 rounded-xl bg-gradient-to-r from-dark-400/80 to-dark-300/80 border border-violet-500/30 shadow-xl backdrop-blur-sm"
          >
            <div className="flex justify-center mb-4">
              <span className="text-3xl" role="img" aria-label="question">❓</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-light-100">Still Have Questions?</h2>
            <p className="text-light-100/80 mb-8 max-w-lg mx-auto">
              Can't find what you're looking for? Reach out to our support team and we'll get back to you as soon as possible.
            </p>
            <a
              href="/help-center"
              className="inline-block bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-4 px-8 rounded-xl shadow-lg hover:shadow-violet-500/25 transition-all"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
