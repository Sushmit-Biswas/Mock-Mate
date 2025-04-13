import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">Privacy Policy</h1>
        <p className="text-light-100/80 mb-2">Last updated: April 13, 2025</p>
      </div>

      <div className="prose prose-invert max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-200">Introduction</h2>
          <p className="text-light-100 mb-4">
            At MockMate, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our AI Interview Platform.
          </p>
          <p className="text-light-100 mb-4">
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-200">Information We Collect</h2>
          <p className="text-light-100 mb-4">
            We collect information that you provide directly to us when you:
          </p>
          <ul className="list-disc pl-6 mb-4 text-light-100">
            <li className="mb-2">Create an account</li>
            <li className="mb-2">Use our interview simulation features</li>
            <li className="mb-2">Upload your resume for analysis</li>
            <li className="mb-2">Provide feedback or contact customer support</li>
          </ul>
          <p className="text-light-100 mb-4">
            This information may include your name, email address, profile picture, and any other information 
            you choose to provide in your account profile or during interactions with our platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-200">How We Use Your Information</h2>
          <p className="text-light-100 mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4 text-light-100">
            <li className="mb-2">Provide, maintain, and improve our services</li>
            <li className="mb-2">Create and manage your account</li>
            <li className="mb-2">Process and complete transactions</li>
            <li className="mb-2">Send you technical notices and support messages</li>
            <li className="mb-2">Respond to your comments and questions</li>
            <li className="mb-2">Develop new programs, services, and features</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-200">Data Security</h2>
          <p className="text-light-100 mb-4">
            We implement appropriate technical and organizational measures to maintain the security of your personal data, 
            including preventing unauthorized access or disclosure.
          </p>
          <p className="text-light-100 mb-4">
            However, no Internet or email transmission is ever fully secure or error-free. In particular, email sent to 
            or from us may not be secure. Therefore, you should take special care in deciding what information you send 
            to us via email.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-200">Contact Us</h2>
          <p className="text-light-100 mb-4">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-light-100">
            <a href="mailto:contact@mockmate.com" className="text-primary-200 hover:underline">
              contact@mockmate.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-primary-200 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
