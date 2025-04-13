import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import {
  getFeedbackByInterviewId, getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";
import ConfettiSuccess from "@/components/ConfettiSuccess";
import InterviewNotes from "@/components/InterviewNotes";
import QuickTips from "@/components/QuickTips";
import { RouteParams } from "@/types";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  });

  return (
    // Restore section-feedback class without pattern-feedback to keep the frosted glass effect
    <div className="section-feedback">
      {/* Render Confetti directly */}
      {feedback && <ConfettiSuccess />}

      {/* Restore the original glass-container class without additional modifications */}
      <div className="glass-container animate-fadeIn p-6 md:p-8 lg:p-10">
        <div className="flex flex-row justify-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Feedback on the Interview -{" "}
            <span className="capitalize">{interview.role}</span> Interview
          </h1>
        </div>

        <div className="flex flex-row justify-center my-4">
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            {/* Overall Impression */}
            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>
                Overall Impression:{" "}
                <span className="text-primary-200 font-bold">
                  {feedback?.totalScore ?? "N/A"}
                </span>
                /100
              </p>
            </div>

            {/* Date */}
            <div className="flex flex-row gap-2 items-center">
              <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
              <p>
                {feedback?.createdAt
                  ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <hr className="opacity-30 my-4" />

        {feedback ? (
          <>
            <p className="mb-6">{feedback.finalAssessment}</p>

            {/* Interview Breakdown */}
            <div className="flex flex-col gap-4 mb-6">
              <h2>Breakdown of the Interview:</h2>
              {feedback.categoryScores?.map((category, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold">
                    {index + 1}. {category.name} ({category.score}/100)
                  </p>
                  <p>{category.comment}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <h3>Strengths</h3>
              <ul>
                {feedback.strengths?.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              <h3>Areas for Improvement</h3>
              <ul>
                {feedback.areasForImprovement?.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>

            {/* Export Transcript Button has been removed as requested */}
          </>
        ) : (
          <p className="text-center text-light-400 my-8">
            Feedback details are not available for this interview.
          </p>
        )}

        <div className="buttons">
          <Button className="btn-secondary flex-1">
            <Link href="/" className="flex w-full justify-center">
              <p className="text-sm font-semibold text-primary-200 text-center">
                Back to dashboard
              </p>
            </Link>
          </Button>

          <Button className="btn-primary flex-1">
            <Link
              href={`/interview/${id}`}
              className="flex w-full justify-center"
            >
              <p className="text-sm font-semibold text-black text-center">
                Retake Interview
              </p>
            </Link>
          </Button>
        </div>

        {/* Interview Notes */}
        <Suspense fallback={<div className="mt-6 text-center text-light-400">Loading notes...</div>}>
          <InterviewNotes interviewId={id} />
        </Suspense>
      </div>
      
      {/* Render QuickTips CENTERED BELOW the main glass container */}
      <div className="mt-8 max-w-3xl mx-auto glass-effect p-4 mb-10">
        <QuickTips />
      </div>
    </div>
  );
};

export default Feedback;
