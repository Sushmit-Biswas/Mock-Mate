import Image from "next/image";
import { redirect } from "next/navigation";

import Agent from "@/components/Agent";
import { getRandomInterviewCover, getTechLogos } from "@/lib/utils"; // Import getTechLogos
import { RouteParams } from "@/types"; // Import RouteParams

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons"; // Keep this import

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  // Redirect if user is not found
  if (!user) {
    redirect("/sign-in");
  }

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  // Fetch feedback
  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  // Fetch tech icons
  const techIcons = await getTechLogos(interview.techstack).catch(err => {
    console.error(`Failed to fetch icons for interview ${id}:`, err);
    return []; // Return empty array on error
  });

  return (
    <>
      {/* Added top margin */}
      <div className="mt-8 flex flex-row gap-4 justify-between items-start"> {/* Adjusted alignment */}
        <div className="flex flex-row gap-4 items-center max-sm:flex-col max-sm:items-start"> {/* Adjusted mobile alignment */}
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={36} // Slightly smaller image
              height={36}
              className="rounded-full object-cover size-[36px]"
            />
            {/* Reduced heading size */}
            <h3 className="capitalize text-xl font-semibold">{interview.role} Interview</h3>
          </div>

          {/* Pass fetched icons to DisplayTechIcons */}
          <DisplayTechIcons icons={techIcons} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit text-sm"> {/* Adjusted size */}
          {interview.type}
        </p>
      </div>

      {/* Add margin-top for spacing */}
      <div className="mt-6 sm:mt-8">
        <Agent
          userName={user.name || ''}
          userId={user.id}
          interviewId={id}
          type="interview"
          questions={interview.questions}
          feedbackId={feedback?.id}
          userPhotoUrl={user.photoURL}
        />
      </div>
    </>
  );
};

export default InterviewDetails;
