"use client";

import { useState } from "react";
import { toast } from "sonner";
import ResumeUploader from "./ResumeUploader";
import ResumeResults from "./ResumeResults";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface ResumeCheckerProps {
  userId: string;
}

type ResultData = {
  matchPercentage: number;
  missingSkills: string[];
  feedback: string;
  profileSummary: string;
};

const ResumeChecker: React.FC<ResumeCheckerProps> = ({ userId }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResultData | null>(null);

  const handleFileChange = (file: File | null) => {
    setResumeFile(file);
    setResults(null); // Clear previous results when file changes
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setResults(null); // Clear previous results when job description changes
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      toast.error("Please upload a resume PDF file");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Please enter a job description");
      return;
    }

    setIsLoading(true);
    setResults(null); // Clear previous results before new analysis
    
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);
      formData.append("userId", userId);

      const response = await fetch("/api/resume-checker", {
        method: "POST",
        body: formData,
      });

      // Check if the response status indicates an error (e.g., 4xx or 5xx)
      if (!response.ok) {
        let errorMsg = "Failed to analyze resume due to a server error."; // Default error message
        try {
          // Attempt to parse the error response from the API
          const errorData = await response.json();
          // Use the specific error message from the API if available
          errorMsg = errorData.error || errorMsg; 
        } catch (parseError) {
          // If parsing the error response fails, log it and use the default message
          console.error("Failed to parse error response:", parseError);
        }
        // Throw an error with the specific or default message
        throw new Error(errorMsg);
      }

      // If response is OK, parse the successful result
      const data = await response.json();
      setResults(data);
      toast.success("Resume analysis complete!");

    } catch (error) {
      // Catch errors thrown from the try block (including the !response.ok check)
      console.error("Resume analysis error:", error);
      // Display the error message using toast
      toast.error(error instanceof Error ? error.message : "An unknown error occurred during analysis.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <Card className="relative overflow-hidden backdrop-blur-md bg-dark-100/30 shadow-xl border border-primary-200/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary-200/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Card Header with gradient title */}
        <div className="p-6 pb-0 border-b border-gray-700/40 mb-6 relative z-10">
          <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent">
            Resume ATS Checker
          </h2>
        </div>
        
        <CardContent className="pt-4 relative z-10">
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-200"></span>
              Upload your resume
            </h3>
            <p className="text-light-400 text-sm mb-4">
              Upload your resume in PDF format to compare against a job description.
              Your file will be processed immediately and not stored.
            </p>
            <div className="bg-dark-200/50 backdrop-blur-sm p-5 rounded-lg border border-gray-700/40 shadow-inner">
              <ResumeUploader onFileChange={handleFileChange} />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2 flex items-center">
              <span className="inline-block w-2 h-2 mr-2 rounded-full bg-primary-200"></span>
              Enter job description
            </h3>
            <p className="text-light-400 text-sm mb-4">
              Paste the job description you want to match your resume against.
            </p>
            <Textarea 
              placeholder="Paste job description here..." 
              className="min-h-[150px] bg-dark-200/70 border-gray-700/50 backdrop-blur-sm shadow-inner"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!resumeFile || !jobDescription.trim() || isLoading}
            className="w-full relative overflow-hidden group"
            style={{
              background: "linear-gradient(90deg, #4ade80 0%, #9333ea 100%)"
            }}
          >
            {/* Button shine effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"></span>
            <span className="relative z-10 text-base py-1">{isLoading ? "Analyzing..." : "Analyze Resume"}</span>
            <style jsx>{`
              @keyframes shine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
              }
              .shine-animation {
                animation: shine 3s infinite;
              }
            `}</style>
          </Button>
        </CardContent>
      </Card>

      {results && (
        <ResumeResults results={results} />
      )}
    </div>
  );
};

export default ResumeChecker;
