// Mock interview guides data
import { GuideItem } from '../actions/guide.action';

export const mockGuides: GuideItem[] = [
  {
    id: 'technical-interview-prep',
    title: 'Technical Interview Preparation Guide',
    content: `
# Technical Interview Preparation Guide

## Introduction
Technical interviews can be challenging, but with the right preparation, you can walk in with confidence. This guide covers the essential concepts, common questions, and strategies for acing your technical interview.

## Core Concepts to Master

### Data Structures
- Arrays and Strings
- Linked Lists
- Stacks and Queues
- Trees and Graphs
- Hash Tables
- Heaps

### Algorithms
- Sorting (Quick Sort, Merge Sort, etc.)
- Searching (Binary Search, Depth-First Search, Breadth-First Search)
- Dynamic Programming
- Greedy Algorithms
- Recursion

## Common Technical Questions

1. **Array Manipulation**: Find duplicates, merge sorted arrays, rotate arrays
2. **String Operations**: Check for anagrams, palindromes, pattern matching
3. **Linked List Problems**: Detect cycles, reverse a linked list, find the middle element
4. **Tree Traversals**: In-order, pre-order, post-order traversals; Binary Search Tree operations
5. **Graph Problems**: Shortest path algorithms, topological sorting, connectivity

## Tips for Success
- Understand the problem thoroughly before coding
- Think out loud and explain your approach
- Consider edge cases
- Analyze time and space complexity
- Write clean, readable code
- Test your solution with examples

## Practice Resources
- LeetCode
- HackerRank
- CodeSignal
- Project Euler

Remember, it's not just about finding the correct solution, but also about demonstrating your problem-solving approach and communication skills.
    `,
    category: 'Technical',
    topics: ['Data Structures', 'Algorithms', 'Problem Solving'],
    level: 'Intermediate',
    imageUrl: '/pattern1.jpg',
    isFeatured: true,
    description: 'A comprehensive guide to help you prepare for technical interviews, covering data structures, algorithms, and common questions.'
  },
  {
    id: 'behavioral-interview-strategies',
    title: 'Mastering Behavioral Interview Questions',
    content: `
# Mastering Behavioral Interview Questions

## Introduction
Behavioral interviews assess how you've handled situations in the past to predict how you'll perform in the future. This guide will help you prepare compelling stories and responses for common behavioral questions.

## The STAR Method

One of the most effective frameworks for answering behavioral questions is the STAR method:

- **Situation**: Set the context for your story
- **Task**: Describe your responsibility or assignment
- **Action**: Explain the specific steps you took
- **Result**: Share the outcome and what you learned

## Common Behavioral Questions

### Leadership
- "Tell me about a time when you led a team through a difficult project."
- "Describe a situation where you had to motivate others."

### Problem Solving
- "Give an example of a time you faced a complex problem."
- "Tell me about a time you had to make a decision with incomplete information."

### Teamwork
- "Describe a situation where you had to work with someone difficult."
- "Tell me about a time you resolved a conflict in your team."

### Adaptability
- "Tell me about a time you had to adapt to a significant change."
- "Describe how you handled an unexpected obstacle."

### Failure
- "Tell me about a time you failed and what you learned."
- "Describe a project that didn't go as planned."

## Preparation Tips
1. **Identify Your Stories**: Prepare 5-7 detailed stories from your experience
2. **Quantify Results**: Use numbers and metrics when possible
3. **Be Specific**: Avoid generalizations; focus on concrete examples
4. **Stay Positive**: Even when discussing challenges, emphasize solutions and learnings
5. **Practice Delivery**: Rehearse your stories but avoid sounding scripted

## Red Flags to Avoid
- Blaming others
- Showing inability to accept feedback
- Demonstrating poor self-awareness
- Revealing conflicts you couldn't resolve

Remember that behavioral interviews are your opportunity to showcase your soft skills and cultural fit with the company.
    `,
    category: 'Behavioral',
    topics: ['STAR Method', 'Communication', 'Self-awareness'],
    level: 'All Levels',
    imageUrl: '/pattern2.jpg',
    isFeatured: true,
    description: 'Learn how to effectively answer behavioral interview questions using the STAR method and structured examples from your experience.'
  },
  {
    id: 'system-design-interviews',
    title: 'System Design Interview Framework',
    content: `
# System Design Interview Framework

## Introduction
System design interviews evaluate your ability to design large-scale distributed systems. They test your knowledge of scalability, reliability, and efficiency. This guide provides a structured approach to tackle these complex questions.

## The 4-Step Framework

### 1. Requirements Clarification
- Functional requirements: What exactly does the system need to do?
- Non-functional requirements: Reliability, availability, consistency, latency, throughput
- Scale: Users, data volume, requests per second
- Special constraints or considerations

### 2. High-Level Design
- System components and services
- Data flow between components
- API design (endpoints, parameters, responses)
- Database schema (if applicable)
- Rough capacity estimation

### 3. Detailed Design
- Deep dive into critical components
- Data storage solutions
- Caching strategies
- Load balancing approaches
- Handling concurrency and consistency

### 4. Bottlenecks and Tradeoffs
- Identify potential bottlenecks
- Discuss solutions for scaling (horizontal vs vertical)
- Consider tradeoffs (consistency vs availability, performance vs cost)
- Failure points and recovery strategies

## Common System Design Questions

1. **Design a URL shortening service (like bit.ly)**
2. **Design a social media feed**
3. **Design a distributed file storage system**
4. **Design a messaging system**
5. **Design a video streaming platform**

## Key Concepts to Understand

- **Scalability**: Vertical vs horizontal scaling
- **Load Balancing**: Methods and algorithms
- **Database Sharding**: Strategies and tradeoffs
- **Caching**: Levels, eviction policies, consistency issues
- **CDNs**: When and how to use them
- **Microservices Architecture**: Benefits and challenges
- **API Gateway Patterns**: Authentication, rate limiting

## Tips for Success
- Start with simple designs and iterate
- Draw diagrams to communicate your ideas
- Discuss tradeoffs explicitly
- Ask clarifying questions
- Consider both happy path and failure scenarios

Remember that there's rarely a single "correct" design. The interviewer is more interested in your thought process and reasoning than a specific solution.
    `,
    category: 'Systems',
    topics: ['Distributed Systems', 'Scalability', 'System Architecture'],
    level: 'Advanced',
    imageUrl: '/pattern3.jpg',
    description: 'A comprehensive framework for approaching system design interviews, with strategies for building scalable, reliable distributed systems.'
  },
  {
    id: 'coding-interview-tips',
    title: 'Strategies for Coding Interviews',
    content: `
# Strategies for Coding Interviews

## Introduction
Coding interviews assess your problem-solving abilities, coding skills, and technical knowledge. This guide provides strategies to successfully navigate through coding challenges during interviews.

## Before You Start Coding

### 1. Understand the Problem
- Listen carefully to the problem statement
- Ask clarifying questions about input/output formats, constraints, edge cases
- Confirm your understanding by repeating the problem in your own words

### 2. Think Before Coding
- Consider different approaches before diving into a solution
- Start with a brute force approach, then optimize
- Talk through your thought process - interviewers value this!

## Effective Coding Strategies

### 1. Choose the Right Data Structures
- Arrays/Lists: For ordered collections, easy access by index
- Hash Maps: For quick lookups, counting, de-duplication
- Stacks: For parsing expressions, depth-first search
- Queues: For breadth-first search, level-order traversals
- Trees/Graphs: For hierarchical or connected data

### 2. Algorithm Selection
- Iteration vs Recursion: Consider stack limitations for recursive solutions
- Divide and Conquer: Breaking complex problems into simpler subproblems
- Dynamic Programming: For optimization problems with overlapping subproblems
- Greedy Algorithms: For making locally optimal choices

### 3. Time and Space Complexity
- Always analyze the efficiency of your solution
- Discuss tradeoffs between time and space
- Know common complexities:
  - O(1): Constant time operations
  - O(log n): Binary search
  - O(n): Linear scan
  - O(n log n): Efficient sorting algorithms
  - O(n²): Nested loops
  - O(2^n): Combinatorial problems

## While Coding

- Write clean, readable code with meaningful variable names
- Test your solution with examples as you go
- Narrate your coding process
- If you get stuck, step back and reconsider the approach

## Example Problem-Solving Framework

1. **Understand**: Clarify the problem and constraints
2. **Match**: Identify similar patterns from problems you know
3. **Plan**: Outline your algorithm before coding
4. **Implement**: Write clean, efficient code
5. **Review**: Test with examples and edge cases
6. **Evaluate**: Discuss complexity and potential optimizations

## Common Mistakes to Avoid
- Rushing to code without a clear plan
- Not considering edge cases
- Over-complicating the solution
- Focusing too much on syntax details
- Not testing your code

Remember, practice is key to coding interview success. Regular practice on platforms like LeetCode, HackerRank, and CodeSignal will help you build confidence and develop problem-solving patterns.
    `,
    category: 'Coding',
    topics: ['Problem Solving', 'Algorithms', 'Interview Strategies'],
    level: 'Intermediate',
    imageUrl: '/pattern4.jpg',
    description: 'Learn effective strategies for approaching coding problems during interviews, including problem-solving frameworks and common pitfalls to avoid.'
  },
  {
    id: 'resume-building-guide',
    title: 'Creating a Technical Resume That Gets Noticed',
    content: `
# Creating a Technical Resume That Gets Noticed

## Introduction
Your resume is often the first impression you make on potential employers. In the competitive tech industry, having a well-crafted resume can be the difference between landing an interview or being overlooked.

## Resume Structure

### 1. Header
- Name, phone number, email, location
- LinkedIn profile, GitHub, portfolio website
- Clean, professional formatting

### 2. Professional Summary
- 2-3 sentences highlighting your experience, skills, and career goals
- Tailor to the specific role you're applying for
- Include key technologies you specialize in

### 3. Technical Skills
- Organize by categories (Programming Languages, Frameworks, Tools, etc.)
- List most relevant skills first
- Be honest about proficiency levels

### 4. Work Experience
- Company name, location, your title, and dates
- 3-5 bullet points per role focusing on:
  - Technical challenges you solved
  - Impact of your work (metrics when possible)
  - Technologies you used
  - Team collaboration
- Use action verbs: Developed, Implemented, Architected, Optimized

### 5. Projects
- Include personal or open-source projects if relevant
- Describe the problem, solution, and technologies used
- Include links to GitHub repositories or live demos

### 6. Education
- Degree, institution, graduation date
- Relevant coursework or academic achievements
- Certifications and continuing education

## Optimization Strategies

### ATS Optimization
- Include keywords from the job description
- Use standard section headings
- Avoid unusual formatting, tables, or graphics
- Submit in PDF format unless specified otherwise

### Content Tips
- Quantify achievements when possible (e.g., "Reduced load time by 40%")
- Focus on outcomes, not just tasks
- Emphasize relevant experience for the specific role
- Keep to 1-2 pages (1 page for less than 10 years of experience)

### Common Mistakes to Avoid
- Generic descriptions that don't showcase your unique contributions
- Technical jargon without explaining impact
- Typos or grammatical errors
- Including outdated or irrelevant technologies

## Tailoring Your Resume
- Research the company and role before applying
- Highlight experience most relevant to the position
- Adjust your professional summary for each application
- Consider the company culture and values

## Final Checklist
- Is your contact information current and professional?
- Does your resume clearly show your qualifications for the specific role?
- Have you included metrics and achievements?
- Is the formatting consistent and easy to read?
- Has someone else reviewed it for errors or clarity issues?

Remember, a strong resume opens doors, but it's your skills and interview performance that land the job. Use your resume to earn the opportunity to showcase your abilities in person.
    `,
    category: 'Job Search',
    topics: ['Resume Building', 'Career Development', 'Job Applications'],
    level: 'All Levels',
    imageUrl: '/pattern5.jpg',
    description: 'Learn how to craft a technical resume that highlights your skills and experience effectively, helping you stand out to recruiters and hiring managers.'
  },
  {
    id: 'negotiating-tech-offers',
    title: 'How to Negotiate Your Tech Job Offer',
    content: `
# How to Negotiate Your Tech Job Offer

## Introduction
Receiving a job offer is exciting, but the process isn't complete until you've negotiated the terms. Many candidates accept the first offer presented, potentially leaving significant compensation and benefits on the table. This guide will help you navigate tech job offer negotiations with confidence.

## Before Negotiation

### Research Market Rates
- Use sites like Glassdoor, Levels.fyi, and Blind
- Talk to peers in similar roles
- Consider geographic differences
- Factor in company size and funding stage

### Know Your Value
- Assess your experience, specialized skills, and achievements
- Identify your unique selling points
- Understand how you'll contribute to the company's goals

### Define Your Priorities
- Base salary vs equity
- Work-life balance considerations
- Remote work flexibility
- Professional development opportunities
- Relocation support

## The Negotiation Process

### Initial Response
- Express enthusiasm for the offer and the company
- Avoid accepting or rejecting immediately
- Ask for time to review (24-48 hours is reasonable)
- Get the complete offer in writing

### Structuring Your Counteroffer
- Be specific about what you're asking for
- Provide clear justification based on:
  - Market research
  - Your specific skills and experience
  - Competing offers (if applicable)
- Consider the full compensation package, not just salary

### Negotiation Communication
- Email for initial counteroffer (creates a record)
- Phone call for discussions (allows for real-time feedback)
- Be professional and collaborative, not adversarial
- Use phrases like:
  - "Based on my research and the value I bring..."
  - "Would you be open to discussing..."
  - "I'm excited about this role and want to make it work for both of us"

## What to Negotiate

### Base Salary
- Often the most important component
- Typically increases 10-20% with successful negotiation

### Equity Compensation
- Understand the type of equity (RSUs, options)
- Ask about vesting schedules and exercise windows
- Consider valuation and potential growth

### Signing Bonus
- One-time payment to help bridge gaps
- Can be easier for companies to approve than salary increases

### Performance Bonus
- Structure, timing, and determination
- Guaranteed vs target amounts

### Benefits and Perks
- Health insurance coverage
- Retirement contributions
- Professional development budget
- Remote work policy
- Flexible hours

### Start Date & Time Off
- Delayed start for personal time
- Additional vacation days
- Sabbatical options

## Handling Pushback

- Ask for specific constraints ("What's limiting your flexibility on this point?")
- Find creative alternatives
- Know when to prioritize and when to compromise
- Be ready to accept or walk away based on your priorities

## After Reaching Agreement

- Get the final offer in writing
- Review all details carefully
- Express gratitude regardless of outcome
- Maintain professional relationships

## Final Thoughts
Remember that negotiation is a normal part of the hiring process. Companies expect it, and a reasonable negotiation typically won't result in an offer being rescinded. Approach the conversation with confidence, preparation, and professionalism.

The goal is to reach an agreement that recognizes your value while respecting the company's constraints—creating a foundation for a positive professional relationship.
    `,
    category: 'Job Search',
    topics: ['Salary Negotiation', 'Job Offers', 'Career Development'],
    level: 'Intermediate',
    imageUrl: '/pattern6.jpg',
    description: 'A strategic guide for negotiating your tech job offer, covering salary, equity, benefits, and how to approach the conversation professionally.'
  }
];

export default mockGuides;
