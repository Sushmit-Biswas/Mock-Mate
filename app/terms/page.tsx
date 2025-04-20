"use client";

import React from 'react';
import Link from 'next/link';
// Removed unused ArrowLeft import
// import { ArrowLeft } from 'lucide-react'; 

/**
 * Terms of Service Page Component
 * 
 * Displays the MockMate's terms of service in a structured and readable format.
 * Uses glass-effect utility classes for a modern UI appearance with sections for
 * different terms categories.
 */
export default function TermsOfService() {
  return (
    // Remove redundant background style and classes, it's handled by layout.tsx and globals.css
    <div className="min-h-screen"> 
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header section with gradient text styling for visual appeal */}
        <div className="glass-effect p-8 mb-8 text-center"> 
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-light-100/80 mb-2">
            Last updated: April 13, 2025
          </p>
        </div>
        {/* Main content section with all terms categories */}
        <div className="glass-effect p-8"> 
          <div className="prose prose-invert max-w-none">
            {/* Agreement section */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary-200">Agreement to Terms</h2>
            <p className="text-light-100 mb-4">
              By accessing and using the MockMate platform, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          {/* Service description section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-200">Description of Service</h2>
            <p className="text-light-100 mb-4">
              MockMate provides an AI-powered interview practice platform designed to help users prepare for job interviews. 
              Our services include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-light-100">
              <li className="mb-2">AI-powered mock interviews with instant feedback</li>
              <li className="mb-2">Resume analysis and optimization for job applications</li>
              <li className="mb-2">Interview preparation resources and guides</li>
              <li className="mb-2">Profile management to track progress</li>
            </ul>
            <p className="text-light-100">
              We reserve the right to modify or discontinue, temporarily or permanently, the service with or without notice.
            </p>
          </section>

          {/* User accounts section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-200">User Accounts</h2>
            <p className="text-light-100 mb-4">
              When you create an account with us, you must provide accurate, complete, and up-to-date information. 
              You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>
            <p className="text-light-100 mb-4">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming 
              aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          {/* Intellectual property section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-200">Intellectual Property</h2>
            <p className="text-light-100 mb-4">
              The service and its original content, features, and functionality are and will remain the exclusive property 
              of MockMate and its licensors. The service is protected by copyright, trademark, and other laws of both the 
              United States and foreign countries.
            </p>
            <p className="text-light-100 mb-4">
              Our trademarks and trade dress may not be used in connection with any product or service without the prior 
              written consent of MockMate.
            </p>
          </section>

          {/* Liability limitations section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-200">Limitation of Liability</h2>
            <p className="text-light-100 mb-4">
              In no event shall MockMate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
              for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of 
              profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-light-100">
              <li className="mb-2">Your access to or use of or inability to access or use the service;</li>
              <li className="mb-2">Any conduct or content of any third party on the service;</li>
              <li className="mb-2">Any content obtained from the service; and</li>
              <li className="mb-2">Unauthorized access, use, or alteration of your transmissions or content.</li>
            </ul>
          </section>

          {/* Contact information section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-primary-200">Contact Us</h2>
            <p className="text-light-100 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-light-100">
              <a href="mailto:legal@mockmate.com" className="text-primary-200 hover:underline">
                legal@mockmate.com
              </a>
            </p>
          </section>
        </div> {/* Closes prose div */}
      </div> {/* Closes second glass-effect div */}

        {/* Return to home link for easy navigation */}
        <div className="mt-12 text-center">
          <Link href="/" className="text-primary-200 hover:underline">
            Return to Home
          </Link>
        </div>
      </div> {/* Closes max-w-4xl div */}
    </div> /* Closes min-h-screen div */
  ); // Semicolon AFTER parenthesis
}
