"use client";

import InterviewCard from "./InterviewCard";
import { InterviewWithDetails } from "@/app/(root)/page";

interface InterviewListProps {
  title: string;
  interviews: InterviewWithDetails[];
  emptyMessage: string;
}

const InterviewList = ({ title, interviews, emptyMessage }: InterviewListProps) => {
  // Get an ID for the section based on the title
  const sectionId = title.toLowerCase().replace(/\s+/g, "-");
  
  return (
    <section id={sectionId} className="interviews-section pt-12 pb-6"> {/* Changed padding */}
      <div className="flex flex-row justify-between items-center mb-8">
        <h2>{title}</h2>
      </div>

      {!interviews || interviews.length === 0 ? (
        <p className="text-center text-light-400 py-8">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              id={interview.id}
              role={interview.role}
              type={interview.type}
              createdAt={interview.createdAt}
              feedback={interview.feedback}
              icons={interview.icons}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default InterviewList;
