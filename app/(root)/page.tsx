import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewList from "@/components/InterviewList"; // Import the list component
import TestimonialsSection from "@/components/TestimonialsSection"; // Import the new testimonials component
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getFeedbackByInterviewId, // Import feedback action
} from "@/lib/actions/general.action";
import { Interview, Feedback } from "@/types"; // Import base types
import { getTechLogos } from "@/lib/utils"; // Import getTechLogos
import { TechIconData } from "@/components/DisplayTechIcons"; // Import icon type

import { redirect } from "next/navigation";

// Define a type for interview + feedback
type InterviewWithFeedback = Interview & { feedback: Feedback | null };
// Define a type for the final combined data including icons
export type InterviewWithDetails = InterviewWithFeedback & { icons: TechIconData[] }; // Export if needed elsewhere, otherwise remove export

async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch base interviews
  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(user.id),
    getLatestInterviews({ userId: user.id }),
  ]);

  // Helper function to fetch feedback and icons for a list of interviews
  const fetchDetailsForInterviews = async (interviews: Interview[] | null | undefined): Promise<InterviewWithDetails[]> => {
    if (!interviews || interviews.length === 0) {
      return [];
    }

    // Fetch feedback
    const feedbackPromises = interviews.map(interview =>
      getFeedbackByInterviewId({ interviewId: interview.id, userId: user.id })
        .catch(err => {
          console.error(`Failed to fetch feedback for interview ${interview.id}:`, err);
          return null;
        })
    );
    const feedbacks = await Promise.all(feedbackPromises);

    // Fetch tech icons
    const iconPromises = interviews.map(interview =>
      getTechLogos(interview.techstack)
        .catch(err => {
          console.error(`Failed to fetch icons for interview ${interview.id}:`, err);
          return [];
        })
    );
    const iconsList = await Promise.all(iconPromises);

    // Combine interview, feedback, and icons
    return interviews.map((interview, index) => ({
      ...interview,
      feedback: feedbacks[index],
      icons: iconsList[index],
    }));
  };

  // Fetch details for both lists concurrently
  const [userInterviewsWithDetails, allInterviewsWithDetails] = await Promise.all([
    fetchDetailsForInterviews(userInterviews),
    fetchDetailsForInterviews(allInterview),
  ]);

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
            Get Interview-Ready with AI-Powered Practice & Feedback
          </h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {/* Changed from "Your Interviews" to "My Interviews" */}
      <InterviewList
        title="My Interviews"
        interviews={userInterviewsWithDetails} // Pass data with icons
        emptyMessage="You haven't created any interviews yet"
        // Removed itemsPerPage prop
      />

      {/* Use InterviewList for "Other Interviews" with full details */}
      <InterviewList
        title="Other Interviews"
        interviews={allInterviewsWithDetails} // Pass data with icons
        emptyMessage="There are no interviews available"
        // Removed itemsPerPage prop
      />
      
      {/* Add the new testimonials section */}
      <TestimonialsSection />
    </>
  );
}

export default Home;
