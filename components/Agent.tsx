"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFeedback } from "@/lib/actions/general.action";
import { AgentProps } from "@/types";
import { Video, VideoOff } from "lucide-react"; // Add import for camera icons

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
  userPhotoUrl,
}: AgentProps & { userPhotoUrl?: string | null }) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  // Add camera state
  const [cameraOn, setCameraOn] = useState(false);
  // const [isCameraLoading, setIsCameraLoading] = useState(false); // Remove camera loading state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Silent timeout handling
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const SILENCE_THRESHOLD = 20000; // 20 seconds

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
        // The AI can respond now (vapi will handle this automatically)
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

  // Function to toggle camera on/off
  const toggleCamera = async () => {
    if (cameraOn) {
      // Turn off camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setCameraOn(false);
      // setIsCameraLoading(false); // Remove loading state logic
    } else {
      // Turn on camera
      // setIsCameraLoading(true); // Remove loading state logic
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          // Ensure the video element is ready before setting srcObject
          videoRef.current.onloadedmetadata = () => {
             console.log("Video metadata loaded");
          };
          videoRef.current.srcObject = stream;
          // Attempt to play explicitly after setting srcObject, though autoPlay should handle it
          await videoRef.current.play().catch(playError => {
            console.error("Error attempting to play video:", playError);
            // Handle autoplay issues if necessary
          });
        }

        streamRef.current = stream;
        setCameraOn(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Failed to access camera. Please check permissions.");
      } // finally { // Remove loading state logic
        // setIsCameraLoading(false); // Remove loading state logic
      // }
    }
  };

  // Add cleanup for camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

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
      <div className="call-view my-12">
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

        {/* User Profile Card - Apply card styles and ensure centering */}
        <div className="card-border">
          {/* Apply dark-gradient, padding, full height, and flex centering to card-content */}
          <div className="card-content relative dark-gradient rounded-2xl p-6 h-full flex flex-col items-center justify-center overflow-hidden"> {/* Added overflow-hidden */}
            {/* Video or Avatar */}
            {cameraOn ? (
              // Remove container div and loading indicator
              <video
                ref={videoRef}
                autoPlay
                muted // Keep muted for autoplay
                playsInline // Important for mobile
                className="w-full h-full object-cover rounded-lg" // Remove transition/opacity classes
              />
            ) : (
              // Center avatar and name when camera is off (already centered by parent flex)
              <div className="flex flex-col items-center justify-center gap-4"> {/* Removed h-full as parent now handles centering */}
                <Avatar className="h-32 w-32"> {/* Adjusted size */}
                  <AvatarImage src={userPhotoUrl ?? undefined} alt={userName ?? "User"} />
                  <AvatarFallback className="bg-gray-600 text-white text-4xl">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <h3>{userName}</h3>
              </div>
            )}

            {/* Camera toggle button - Positioned relative to card-content */}
            <button
              onClick={toggleCamera}
              className="absolute top-0 right-0 bg-dark-300 p-2 rounded-full hover:bg-dark-200 transition-colors"
              aria-label={cameraOn ? "Turn camera off" : "Turn camera on"}
              title={cameraOn ? "Turn camera off" : "Turn camera on"}
            >
              {cameraOn ? (
                <VideoOff size={18} className="text-primary-200" />
              ) : (
                <Video size={18} className="text-primary-200" />
              )}
            </button>
            {/* Name is now inside the conditional block */}
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
      <div className="w-full flex justify-center my-12">
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
