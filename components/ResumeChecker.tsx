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
    <div className="flex flex-col gap-6">
      <Card className="glass-effect">
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Upload your resume</h3>
            <p className="text-light-400 text-sm mb-4">
              Upload your resume in PDF format to compare against a job description.
              Your file will be processed immediately and not stored.
            </p>
            <ResumeUploader onFileChange={handleFileChange} />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Enter job description</h3>
            <p className="text-light-400 text-sm mb-4">
              Paste the job description you want to match your resume against.
            </p>
            <Textarea 
              placeholder="Paste job description here..." 
              className="min-h-[150px] bg-dark-200"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={!resumeFile || !jobDescription.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Analyzing..." : "Analyze Resume"}
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
