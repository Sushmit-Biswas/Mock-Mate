"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { BookOpen, Headphones, FileText, Book } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="w-full border-t border-violet-500/40 bg-gradient-to-b from-dark-300/90 to-dark-100 backdrop-blur-lg py-8 px-6"
    >      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & About */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-3">
          <div className="flex items-center gap-3 mb-3">
            <Image 
              src="/logo.svg" 
              alt="MockMate Logo" 
              width={42} 
              height={42} 
              className="transition-all duration-500 hover:rotate-12 hover:scale-110" 
            />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
              MockMate
            </h3>
          </div>
          <p className="text-light-100/90 text-sm leading-relaxed">
            Practice your interviewing skills with our intelligent AI interviewer that provides instant feedback. Ace your next technical or behavioral interview!
          </p>
        </motion.div>
        
        {/* Column 2: Quick Links */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-3">
          <h4 className="text-lg font-semibold text-primary-200 mb-2">Navigation</h4>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className="text-light-100/80 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="hover:translate-x-1 transition-transform duration-300">Home</span>
            </Link>
            <Link 
              href="/interview" 
              className="text-light-100/80 hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="hover:translate-x-1 transition-transform duration-300">Start Interview</span>
            </Link>
            <Link 
              href="/resume-checker" 
              className="text-light-100/80 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="hover:translate-x-1 transition-transform duration-300">Resume Checker</span>
            </Link>
          </div>
        </motion.div>

        {/* Column 3: Resources Links */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-3">
          <h4 className="text-lg font-semibold text-primary-200 mb-2">Resources</h4>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/blog" 
              className="text-light-100/80 hover:text-red-400 transition-colors duration-300 flex items-center gap-2"
            >
              <BookOpen size={16} />
              <span className="hover:translate-x-1 transition-transform duration-300">Blog</span>
            </Link>
            <Link 
              href="/faqs" 
              className="text-light-100/80 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2"
            >
              <FileText size={16} />
              <span className="hover:translate-x-1 transition-transform duration-300">FAQs</span>
            </Link>
            <Link 
              href="/help-center" 
              className="text-light-100/80 hover:text-amber-400 transition-colors duration-300 flex items-center gap-2"
            >
              <Headphones size={16} />
              <span className="hover:translate-x-1 transition-transform duration-300">Help Center</span>
            </Link>
            <Link 
              href="/guides" 
              className="text-light-100/80 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2"
            >
              <Book size={16} />
              <span className="hover:translate-x-1 transition-transform duration-300">Interview Guides</span>
            </Link>
          </div>
        </motion.div>
          {/* Column 4: Legal Links & Contact */}
        <motion.div variants={itemVariants} className="flex flex-col space-y-3">
          <h4 className="text-lg font-semibold text-primary-200 mb-2">Legal & Contact</h4>
          <div className="flex flex-col space-y-2 mb-4">
            <Link 
              href="/privacy" 
              className="text-light-100/80 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
            </Link>
            <Link 
              href="/terms" 
              className="text-light-100/80 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="hover:translate-x-1 transition-transform duration-300">Terms of Service</span>
            </Link>
          </div>
          <p className="text-light-100/80 text-sm">
            Have questions or feedback? Reach out to our team!
          </p>
          <div className="flex space-x-3 pt-1">
            <motion.a 
              href="https://github.com/Sushmit-Biswas/hack-nite" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.2 }}
              className="text-light-400 hover:text-blue-400 transition-all"
            >
              <FaGithub size={22} />
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/sushmit-biswas" 
              target="_blank"
              rel="noopener noreferrer" 
              whileHover={{ y: -4, scale: 1.2 }}
              className="text-light-400 hover:text-violet-400 transition-all"
            >
              <FaLinkedin size={22} />
            </motion.a>
            <motion.a 
              href="https://x.com/Sushmit__Biswas" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.2 }}
              className="text-light-400 hover:text-green-400 transition-all"
            >
              <FaXTwitter size={22} />
            </motion.a>
            <motion.a 
              href="mailto:sushmit.biswas@iiitb.ac.in" 
              whileHover={{ y: -4, scale: 1.2 }}
              className="text-light-400 hover:text-orange-500 transition-all"
            >
              <MdEmail size={22} />
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Centralized Combined Copyright Text */}
      <motion.div 
        variants={itemVariants}
        className="mt-8 pt-4 border-t border-violet-500/20 flex justify-center items-center"
      >
        <p className="text-center font-medium bg-gradient-to-r from-violet-400 via-green-400 to-violet-400 bg-clip-text text-transparent">
          &copy; {currentYear} MockMate AI Interview Platform &nbsp;|&nbsp; Designed with 💜 by the MockMate Team
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
