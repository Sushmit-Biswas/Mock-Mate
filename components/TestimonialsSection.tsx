"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import '@/styles/testimonials.css';

// Define testimonial data
const testimonials = [
  {
    id: 1,
    name: "Daniel Clifford",
    designation: "Software Engineer",
    imgSrc: "/testimonials/person1.png",
    bgColor: "bg-violet-600",
    textColor: "text-white",
    heading: "I received a job offer mid-interview preparation, and the practice I did with MockMate was crucial.",
    review: "I was struggling with technical interviews for months. After using MockMate for just two weeks, I gained the confidence I needed. The AI interviewer asked me the exact types of questions that came up in my real interview. I honestly feel I got every penny's worth from this platform."
  },
  {
    id: 2,
    name: "Jonathan Walters",
    designation: "Full Stack Developer",
    imgSrc: "/testimonials/person2.png",
    bgColor: "bg-gray-700",
    textColor: "text-white",
    heading: "The AI was very supportive and kept me motivated",
    review: "I started as a total newbie with virtually no interview experience. I now work as a senior engineer for a reputable tech company. MockMate was one of the best investments I've made in myself."
  },
  {
    id: 3,
    name: "Kira Whittle",
    designation: "UX Designer",
    imgSrc: "/testimonials/person3.png",
    bgColor: "bg-white",
    textColor: "text-gray-800",
    heading: "Such a life-changing experience. Highly recommended!",
    review: "Before using MockMate, I had terrible interview anxiety. I needed structured practice with realistic feedback. The entire experience did not disappoint. The AI was remarkably attentive to my responses and provided detailed, constructive feedback. It took my interview skills to the next level in a way that no tutorial could ever have. I've often referred to my practice sessions during interviews as examples of my preparation approach. MockMate certainly helped me land my dream job!"
  },
  {
    id: 4,
    name: "Jeanette Harmon",
    designation: "Data Scientist",
    imgSrc: "/testimonials/person4.png",
    bgColor: "bg-white",
    textColor: "text-gray-800",
    heading: "An overall wonderful and rewarding experience",
    review: "Thank you MockMate for the wonderful experience! I now have a job I really enjoy, and make a good living while doing something I love. The realistic interview simulations made all the difference."
  },
  {
    id: 5,
    name: "Patrick Abrams",
    designation: "Product Manager",
    imgSrc: "/testimonials/person5.png", 
    bgColor: "bg-gray-900",
    textColor: "text-white",
    heading: "Awesome interview questions and detailed feedback. Getting guidance from MockMate made interviews easy.",
    review: "The platform seems genuinely concerned about my progress which I find really refreshing. MockMate gave me the confidence necessary to be able to go out in the world and present myself as a capable professional. The standard is above the rest. You will get the personal attention you need with detailed, actionable feedback that truly helps you improve."
  },
];

const TestimonialsSection = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16">
      <h2 className="text-center mb-12 text-3xl font-bold">What Our Users Say</h2>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid gap-6 md:grid-cols-4 md:grid-rows-2">
          {/* Large testimonial - spans 2 columns */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${testimonials[0].bgColor} md:col-span-2 transform transition-all hover:-translate-y-2 hover:shadow-2xl relative`}
            style={{
              backgroundImage: 'url(/bg-pattern-quotation.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '90% 0%',
              backgroundSize: '104px 102px'
            }}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 rounded-full border-2 border-violet-300/40 overflow-hidden h-10 w-10">
                <Image 
                  src={testimonials[0].imgSrc} 
                  alt={testimonials[0].name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-violet-100">{testimonials[0].name}</p>
                <p className="text-sm text-violet-200/70">{testimonials[0].designation}</p>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-4 text-violet-50">{testimonials[0].heading}</h4>
            <p className="text-violet-100/80 text-sm">&quot;{testimonials[0].review}&quot;</p>
          </motion.div>

          {/* Standard testimonial */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${testimonials[1].bgColor} transform transition-all hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 rounded-full border-2 border-gray-400/40 overflow-hidden h-10 w-10">
                <Image 
                  src={testimonials[1].imgSrc} 
                  alt={testimonials[1].name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-100">{testimonials[1].name}</p>
                <p className="text-sm text-gray-300/70">{testimonials[1].designation}</p>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-50">{testimonials[1].heading}</h4>
            <p className="text-gray-200/80 text-sm">&quot;{testimonials[1].review}&quot;</p>
          </motion.div>

          {/* Tall testimonial that spans 2 rows */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${testimonials[2].bgColor} md:row-span-2 transform transition-all hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 rounded-full border-2 border-gray-300/40 overflow-hidden h-10 w-10">
                <Image 
                  src={testimonials[2].imgSrc} 
                  alt={testimonials[2].name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{testimonials[2].name}</p>
                <p className="text-sm text-gray-600">{testimonials[2].designation}</p>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-800">{testimonials[2].heading}</h4>
            <p className="text-gray-600 text-sm">&quot;{testimonials[2].review}&quot;</p>
          </motion.div>
          
          {/* Bottom row */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${testimonials[3].bgColor} transform transition-all hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 rounded-full border-2 border-gray-300/40 overflow-hidden h-10 w-10">
                <Image 
                  src={testimonials[3].imgSrc} 
                  alt={testimonials[3].name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{testimonials[3].name}</p>
                <p className="text-sm text-gray-600">{testimonials[3].designation}</p>
              </div>
            </div>
            <h4 className="text-lg font-bold mb-3 text-gray-800">{testimonials[3].heading}</h4>
            <p className="text-gray-600 text-sm">&quot;{testimonials[3].review}&quot;</p>
          </motion.div>

          {/* Large testimonial - spans 2 columns */}
          <motion.div 
            variants={itemVariants}
            className={`p-6 rounded-xl shadow-lg ${testimonials[4].bgColor} md:col-span-2 transform transition-all hover:-translate-y-2 hover:shadow-2xl`}
          >
            <div className="flex items-center mb-4">
              <div className="mr-4 rounded-full border-2 border-gray-400/40 overflow-hidden h-10 w-10">
                <Image 
                  src={testimonials[4].imgSrc} 
                  alt={testimonials[4].name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-100">{testimonials[4].name}</p>
                <p className="text-sm text-gray-300/70">{testimonials[4].designation}</p>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-4 text-gray-50">{testimonials[4].heading}</h4>
            <p className="text-gray-200/80 text-sm">&quot;{testimonials[4].review}&quot;</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
