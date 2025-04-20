import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewList from "@/components/InterviewList";
import TestimonialsSection from "@/components/TestimonialsSection";
import InteractiveRobot from "@/components/InteractiveRobot";
import StatisticsSection from "@/components/StatisticsSection"; // Add new import
import UserDashboard from "@/components/UserDashboard"; // Add new import
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.action";
import { Interview, Feedback } from "@/types";
import { getTechLogos } from "@/lib/utils";
import { TechIconData } from "@/components/DisplayTechIcons";

import { redirect } from "next/navigation";

// Define a type for interview + feedback
type InterviewWithFeedback = Interview & { feedback: Feedback | null };
// Define a type for the final combined data including icons
export type InterviewWithDetails = InterviewWithFeedback & { icons: TechIconData[] };

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
            <Link href="/interview">Create an Interview</Link>
          </Button>
        </div>

        <div className="max-sm:hidden">
          <InteractiveRobot />
        </div>
      </section>

      {/* Add User Dashboard Section */}
      <section className="mt-10 mb-10">
        <UserDashboard 
          userInterviews={userInterviewsWithDetails}
          allInterviews={allInterviewsWithDetails}
          userName={user.name}
        />
      </section>

      {/* Only render "My Interviews" section if there are interviews */}
      {userInterviewsWithDetails.length > 0 && (
        <InterviewList
          title="My Interviews"
          interviews={userInterviewsWithDetails}
          emptyMessage="You haven't created any interviews yet"
        />
      )}

      {/* Only render "Other Interviews" section if there are interviews */}
      {allInterviewsWithDetails.length > 0 && (
        <InterviewList
          title="Other Interviews"
          interviews={allInterviewsWithDetails}
          emptyMessage="There are no interviews available"
        />
      )}

      {/* Add Statistics Section before testimonials */}
      <StatisticsSection />

      {/* Add the testimonials section */}
      <TestimonialsSection />
    </>
  );
}

export default Home;
