"use client";

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

// FAQ Item component with toggle functionality
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-violet-500/20 last:border-b-0">
      <button
        className="flex justify-between items-center w-full py-5 px-1 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-light-100">{question}</h3>
        <div className="text-violet-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="prose prose-invert max-w-none text-light-100/80">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

// FAQ category section
const FAQCategory = ({ title, faqs }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="bg-dark-300/50 rounded-xl border border-violet-500/20">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default function FAQsPage() {
  // FAQ data organized by categories
  const faqData = [
    {
      category: "General Questions",
      faqs: [
        {
          question: "What is MockMate?",
          answer: "MockMate is an AI-powered interview preparation platform that provides realistic mock interviews with instant feedback. Our AI interviewer asks questions tailored to your target role and provides constructive criticism to help you improve your interviewing skills."
        },
        {
          question: "Do I need to create an account to use MockMate?",
          answer: "Yes, you need to create a free account to access our interview simulations and save your progress. Creating an account allows you to track your performance over time and receive personalized recommendations."
        },
        {
          question: "What makes MockMate different from other interview prep tools?",
          answer: "MockMate offers realistic voice-based conversations with AI rather than just text prompts. Our platform provides detailed feedback on your answers, including content analysis, delivery assessment, and specific improvement suggestions. We also offer a resume checker tool to optimize your job applications."
        },
        {
          question: "Is MockMate free to use?",
          answer: "MockMate offers both free and premium plans. The free plan gives you limited access to interview types and feedback features. Our premium plans unlock all interview types, unlimited sessions, detailed analytics, and priority support."
        }
      ]
    },
    {
      category: "Technical Details",
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
          answer: "MockMate uses advanced natural language processing models to analyze your responses based on content relevance, structure, clarity, and technical accuracy (for technical interviews). The AI is trained on thousands of successful interview responses and industry best practices."
        },
        {
          question: "Can I use MockMate on mobile devices?",
          answer: "Yes, MockMate is fully responsive and works on mobile devices. However, for the best interview simulation experience, we recommend using a desktop or laptop computer with a stable internet connection."
        }
      ]
    },
    {
      category: "Interview Preparation",
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
          question: "Can I pause an interview session and resume later?",
          answer: "Yes, premium users can pause interviews and resume them later. Free users must complete their sessions in one sitting or restart from the beginning."
        }
      ]
    },
    {
      category: "Resume Checker",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-light-100/80 max-w-2xl mx-auto">
            Find answers to common questions about MockMate's interview simulation platform, 
            resume checker, and other features.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
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

        {/* FAQ Categories */}
        {faqData.map((category, index) => (
          <FAQCategory
            key={index}
            title={category.category}
            faqs={category.faqs}
          />
        ))}

        {/* Still Have Questions */}
        <div className="mt-16 text-center p-8 rounded-xl bg-gradient-to-r from-dark-400/80 to-dark-300/80 border border-violet-500/30">
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-light-100/80 mb-6 max-w-lg mx-auto">
            Can't find what you're looking for? Reach out to our support team and we'll get back to you as soon as possible.
          </p>
          <a
            href="/help-center"
            className="inline-block bg-gradient-to-r from-violet-500 to-primary-200 hover:opacity-90 transition-opacity text-white font-medium py-3 px-6 rounded-lg"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
