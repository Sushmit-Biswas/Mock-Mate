"use client";

import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import DisplayTechIcons from "./DisplayTechIcons";
import { TechIconData } from "./DisplayTechIcons"; 

import { cn, getRandomInterviewCover } from "@/lib/utils";
import { Feedback, InterviewCardProps } from "@/types"; // Fixed missing quote

// Define props including the new feedback prop and icons prop
interface InterviewCardComponentProps extends Omit<InterviewCardProps, 'techstack'> {
  feedback: Feedback | null;
  icons: TechIconData[];
  userId?: never;
}

const InterviewCard = ({
  id,
  role,
  type,
  createdAt,
  feedback,
  icons,
}: InterviewCardComponentProps) => {
  
  // Corrected normalization logic
  const normalizedType = /mix/gi.test(type)
    ? "Mixed"
    : /behav/gi.test(type)
    ? "Behavioral"
    : /tech/gi.test(type)
    ? "Technical"
    : "Mixed";

  const badgeColor =
    {
    Behavioral: "bg-violet-600",
    Mixed: "bg-orange-500",
    Technical: "bg-green-600",
    }[normalizedType] || "bg-blue-500";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  return (
    <div className="card-border w-[380px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text">{normalizedType}</p>
          </div>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Interview Role */}
          <h3 className="mt-5 capitalize">{role} Interview</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between items-end">
          <DisplayTechIcons icons={icons} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${id}/feedback`
                  : `/interview/${id}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
