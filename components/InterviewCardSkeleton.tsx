"use client";

import { cn } from "@/lib/utils";

const InterviewCardSkeleton = () => {
  return (
    <div className="card-border w-[380px] max-sm:w-full min-h-96">
      <div className="card-interview animate-pulse">
        <div>
          {/* Type Badge */}
          <div className="absolute top-0 right-0 w-20 h-10 rounded-bl-lg bg-gray-700"></div>

          {/* Cover Image */}
          <div className="rounded-full bg-gray-700 size-[90px]"></div>

          {/* Interview Role */}
          <div className="mt-5 h-6 w-48 bg-gray-700 rounded"></div>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2 items-center">
              <div className="size-[22px] bg-gray-700 rounded"></div>
              <div className="h-4 w-20 bg-gray-700 rounded"></div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="size-[22px] bg-gray-700 rounded"></div>
              <div className="h-4 w-14 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Feedback */}
          <div className="h-12 w-full bg-gray-700 rounded mt-5"></div>
        </div>

        <div className="flex flex-row justify-between items-end">
          {/* Tech Icons */}
          <div className="flex flex-row">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "relative bg-gray-700 rounded-full p-2.5 flex flex-center",
                  i >= 2 && "-ml-3"
                )}
              >
                <div className="size-5 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="btn-primary h-10 w-32 bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default InterviewCardSkeleton;
