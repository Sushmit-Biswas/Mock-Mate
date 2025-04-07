"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { createFeedback } from "@/lib/actions/general.action";
import { AgentProps } from "@/types"; // Import AgentProps

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  userPhotoUrl, // Add userPhotoUrl prop
}: AgentProps & { userPhotoUrl?: string | null }) => { // Add prop to component signature
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  // Add refs for tracking silence
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpeechTimeRef = useRef<number>(0);
  const SILENCE_THRESHOLD = 4000; // 4 seconds before considering silence as intentional pause

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);

        // Reset silence detection when a message is received
        lastSpeechTimeRef.current = Date.now();

        // Check for end-of-call keywords
        const transcriptLower = message.transcript.toLowerCase();
        const endKeywords = [
          "thank you for the call", "goodbye", "bye", "finished", "feedback", "see you", "good luck",
          "that's all","end", "end the call", "end the meeting"
        ];
        
        // Check if the current call status is ACTIVE before disconnecting
        // This prevents potential issues if a keyword appears after the call has already ended
        if (callStatus === CallStatus.ACTIVE && endKeywords.some(keyword => transcriptLower.includes(keyword))) {
          console.log("End keyword detected, disconnecting call...");
          handleDisconnect(); // Call the disconnect function
        }
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
      
      // Clear any existing timeout when speech starts
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
        silenceTimeoutRef.current = null;
      }
      
      // Update the last speech time
      lastSpeechTimeRef.current = Date.now();
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
      
      // Start a new timeout for silence detection
      // This prevents interruptions during small 2-3 second pauses
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      
      silenceTimeoutRef.current = setTimeout(() => {
        const silenceDuration = Date.now() - lastSpeechTimeRef.current;
        if (silenceDuration > SILENCE_THRESHOLD) {
          console.log(`Detected silence for ${silenceDuration}ms, allowing AI to respond`);
          // The AI can respond now (vapi will handle this automatically)
        } else {
          console.log(`Short pause detected (${silenceDuration}ms), waiting for more speech`);
          // Continue listening for more speech
        }
      }, SILENCE_THRESHOLD);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
      
      // Clear timeout on unmount
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, [callStatus]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        // Add string type to question parameter
        formattedQuestions = questions
          .map((question: string) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
          silenceThreshold: SILENCE_THRESHOLD, // Pass silence threshold to the interviewer
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  // Determine initials for fallback avatar
  const getInitials = (name?: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };


  return (
    <>
      {/* Added vertical margin */}
      <div className="call-view my-12"> {/* Increased margin */}
        {/* AI Interviewer Card */}
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="profile-image"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        {/* User Profile Card - Use Avatar */}
        <div className="card-border">
          <div className="card-content">
             <Avatar className="h-[120px] w-[120px]"> {/* Use Avatar component */}
              <AvatarImage src={userPhotoUrl ?? undefined} alt={userName ?? "User"} />
              <AvatarFallback className="bg-gray-600 text-white text-4xl"> {/* Style fallback */}
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <h3>{userName}</h3>
          </div>
        </div>
      </div>

      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      {/* Added vertical margin */}
      <div className="w-full flex justify-center my-12"> {/* Increased margin */}
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call" onClick={() => handleCall()}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== "CONNECTING" && "hidden"
              )}
            />

            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect" onClick={() => handleDisconnect()}>
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;
