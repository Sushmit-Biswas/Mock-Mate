"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ExportTranscriptButtonProps {
  messages: Array<{role: string, content: string}>;
  interviewRole: string;
  interviewDate: string;
}

/**
 * ExportTranscriptButton component to handle the export of interview transcripts.
 * It allows users to download the transcript of the conversation.
 * 
 * @param {Array<{role: string, content: string}>} messages - The messages to export.
 * @param {string} interviewRole - The role of the interviewee.
 * @param {string} interviewDate - The date of the interview.
 */



const ExportTranscriptButton: React.FC<ExportTranscriptButtonProps> = ({
  messages,
  interviewRole,
  interviewDate,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);

  useEffect(() => {
    const validMessages = Array.isArray(messages) && messages.length > 0;
    setHasMessages(validMessages);
    console.log("ExportTranscriptButton Props Update:", {
      hasMessages: validMessages,
      messageCount: Array.isArray(messages) ? messages.length : 'Not an array',
      interviewRole,
      interviewDate
    });
  }, [messages, interviewRole, interviewDate]);


  const handleExport = () => {
    if (!hasMessages) {
       console.error("Export aborted: No valid messages available.");
       toast.error("No transcript data available to export.");
       return;
    }

    setIsExporting(true);
    console.log("Export process started...");
    let link: HTMLAnchorElement | null = null; // Declare link outside try block
    let url: string | null = null; // Declare url outside try block

    try {
      const formattedDate = new Date(interviewDate || Date.now()).toLocaleDateString();
      const safeInterviewRole = interviewRole || "Interview"; // Default role if undefined
      const header = `${safeInterviewRole.toUpperCase()} INTERVIEW TRANSCRIPT - ${formattedDate}\n\n`;

      const content = messages.map(msg => {
        if (!msg || typeof msg.role !== 'string' || typeof msg.content !== 'string') {
          console.warn("Skipping invalid message format:", msg);
          return "";
        }
        const role = msg.role === "user" ? "You" : "Interviewer";
        // Ensure content is treated as a string, trim whitespace
        const messageContent = String(msg.content || "").trim();
        return `${role}:\n${messageContent}\n`;
      }).filter(Boolean).join("\n");

      if (!content.trim()) {
        throw new Error("Formatted transcript content is empty.");
      }

      const transcript = header + content;
      console.log("Formatted Transcript Length:", transcript.length);

      const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" }); // Specify charset
      url = URL.createObjectURL(blob);
      console.log("Blob URL created:", url);

      link = document.createElement("a");
      link.href = url;
      const filename = `interview-transcript-${formattedDate.replace(/[\/\s]/g, "-")}.txt`;
      link.download = filename;
      console.log("Download link created with filename:", filename);

      // Append, click, and immediately remove
      document.body.appendChild(link);
      link.click();
      console.log("Link clicked for download.");
      document.body.removeChild(link); // Remove immediately after click
      link = null; // Clear reference

      // Revoke URL after a short delay
      setTimeout(() => {
        if (url) {
          URL.revokeObjectURL(url);
          console.log("Blob URL revoked.");
          url = null; // Clear reference
        }
      }, 100);

      toast.success("Transcript download initiated!");

    } catch (error) {
      console.error("Error during transcript export:", error);
      toast.error(`Failed to download transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
      // Clean up if link or URL still exist due to error
      if (link && document.body.contains(link)) {
        document.body.removeChild(link);
      }
      if (url) {
        URL.revokeObjectURL(url);
      }
    } finally {
      setIsExporting(false);
      console.log("Export process finished.");
    }
  };

  console.log("Render Export Button State:", { isExporting, hasMessages });

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || !hasMessages}
      variant="outline"
      className="flex gap-2 items-center border-primary-200 text-primary-200 hover:bg-primary-200/10 disabled:opacity-50 disabled:cursor-not-allowed" // Add disabled styles
    >
      <Download size={16} />
      <span>{isExporting ? "Exporting..." : "Export Transcript"}</span>
    </Button>
  );
};

export default ExportTranscriptButton;
