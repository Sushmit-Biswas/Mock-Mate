import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { NextRequest, NextResponse } from "next/server";
import PDFParser from 'pdf-parse-debugging-disabled';

// Adding explicit logging for debugging
console.log("API route module loaded: resume-checker/route.ts");

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  console.log("OPTIONS handler called in resume-checker route");
  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Adjust this in production for security
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  console.log("POST handler called in resume-checker route");
  
  try {
    const formData = await request.formData();
    
    // Get the PDF file from formData
    const resumeFile = formData.get("resume") as File;
    if (!resumeFile) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    // Get job description
    const jobDescription = formData.get("jobDescription") as string;
    if (!jobDescription) {
      return NextResponse.json({ error: "No job description provided" }, { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    // Get userId for logging purposes (optional)
    const userId = formData.get("userId") as string;
    
    // Extract text from PDF
    let resumeText: string;
    try {
      const arrayBuffer = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      const pdfData = await PDFParser(buffer);
      resumeText = pdfData.text;
      
      // Log the first part of extracted text to verify it's correctly extracted
      console.log("PDF extraction successful, first 100 chars:", resumeText?.substring(0, 100));
      
      if (!resumeText || resumeText.trim().length === 0) {
        return NextResponse.json({ error: "Extracted resume text is empty" }, { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError);
      // Keep returning 400 for client-side input errors
      return NextResponse.json({ error: "Failed to parse PDF file. Please ensure it's a valid PDF." }, { status: 400, headers: { 'Content-Type': 'application/json' } });
    }
    
    // Call Google Generative AI to analyze the resume
    let analysisResult;
    try {
      // Get API key from environment
      const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      
      // Log API key existence (but not the actual key for security)
      console.log("Attempting to use Google Generative AI API Key. Is key present?", !!apiKey);
      
      if (!apiKey) {
        // Throw a specific error if the key is missing
        console.error("GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set.");
        throw new Error("Server configuration error: API key is missing."); 
      }
      
      // Create Google model with explicit API key
      analysisResult = await generateText({
        model: google("gemini-2.0-flash-001", {
          apiKey: apiKey,
        }),
        prompt: `
          You are an expert ATS (Applicant Tracking System) resume analyzer. 
          Your task is to carefully analyze the provided resume against the job description and provide detailed, actionable feedback.
          
          ## INSTRUCTIONS:
          1. Calculate a match percentage (0-100) based on how well the resume matches the job requirements
          2. Identify specific missing skills or keywords from the job description that should be added to the resume
          3. Write a brief but detailed feedback on how to improve the resume for this specific job
          4. Create a short professional profile summary based on the resume contents
          
          ## RESPONSE FORMAT:
          Match Percentage: [number between 0-100]
          
          Missing Skills:
          - [specific skill 1 mentioned in job description but missing in resume]
          - [specific skill 2 mentioned in job description but missing in resume]
          - [etc.]
          
          Profile Summary:
          [1-2 sentence professional summary highlighting candidate's experience and strengths]
          
          Feedback:
          [detailed paragraph with 3-5 specific recommendations to improve the resume]
          
          ## INPUT DATA:
          Resume:
          ${resumeText}
          
          Job Description:
          ${jobDescription}
        `
      });
      
      // Log the raw AI response object for debugging
      console.log("Raw AI response object:", JSON.stringify(analysisResult, null, 2));

      // Check if the response is HTML (which indicates an error)
      // Access the text property from the result object
      const aiTextResponse = analysisResult?.text;

      if (typeof aiTextResponse === 'string' && 
          (aiTextResponse.trim().startsWith("<!DOCTYPE") || 
           aiTextResponse.trim().startsWith("<html") ||
           aiTextResponse.includes("<head>") ||
           aiTextResponse.includes("<body>"))) {
        console.error("AI returned an HTML error page instead of text");
        // Return 500 for AI service error
        return NextResponse.json({ 
          error: "AI API error: received HTML content instead of expected text response" 
        }, { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }

      // Check if the text property is missing or empty
      if (!aiTextResponse) {
        console.error("Empty or missing text property in AI response object:", analysisResult);
        // Throw an error for empty/missing text
        throw new Error("AI service returned an unexpected response structure or empty text.");
      }

      // Pass the extracted text to the parsing function
      analysisResult = aiTextResponse; // Reassign analysisResult to the actual text string

    } catch (aiError) {
      // Catch errors specifically from the AI generation block
      console.error("AI generation/API key error:", aiError);
      // Return a 500 error, indicating a server-side issue during AI processing
      return NextResponse.json(
        { error: "Failed to analyze resume due to AI service error. " + (aiError instanceof Error ? aiError.message : "Unknown AI error") },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse the AI response with a try-catch
    let response;
    try {
      // Ensure analysisResult is now definitely a string before parsing
      if (typeof analysisResult !== 'string') {
         // This check might be redundant now but kept for safety
         console.error("Analysis result is not a string after extraction:", analysisResult);
         throw new Error("Internal error: Failed to extract text from AI response.");
      }
      response = parseAnalysisResponse(analysisResult);
    } catch (parseError) {
      // Catch errors specifically from the parsing block
      console.error("Error parsing AI response:", parseError);
      // Return a 500 error, indicating a server-side issue during parsing
      return NextResponse.json(
        { error: "Failed to parse AI analysis result. " + (parseError instanceof Error ? parseError.message : "Invalid format received") },
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Success: Return the parsed response
    return NextResponse.json(response, { 
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Catch any other unhandled errors in the main try block
    console.error("Unhandled resume checker error:", error);
    // Return a generic 500 error for unexpected issues
    return NextResponse.json(
      { error: "An unexpected server error occurred while processing the resume. " + (error instanceof Error ? error.message : "Failed to process resume") },
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

function parseAnalysisResponse(text: string) {
  console.log("Parsing AI response text of length:", text?.length || 0);
  
  // Default values if parsing fails
  const result = {
    matchPercentage: 0,
    missingSkills: [],
    profileSummary: "",
    feedback: ""
  };
  
  if (typeof text !== 'string') {
    console.error("Non-string response received:", text);
    return result;
  }
  
  // Log the full response for debugging (limited to avoid excessive logs)
  console.log("AI response to parse (first 300 chars):", text.substring(0, 300));
  
  try {
    // Extract match percentage
    const matchRegex = /Match\s+Percentage:\s*(\d+)/i;
    const matchMatch = text.match(matchRegex);
    if (matchMatch && matchMatch[1]) {
      result.matchPercentage = parseInt(matchMatch[1], 10);
      console.log("Extracted match percentage:", result.matchPercentage);
    } else {
      console.warn("Failed to extract match percentage from response");
    }
    
    // Extract missing skills
    const missingSkillsRegex = /Missing\s+Skills:(.*?)(?:Profile\s+Summary:|Feedback:|$)/is;
    const skillsMatch = text.match(missingSkillsRegex);
    if (skillsMatch && skillsMatch[1]) {
      result.missingSkills = skillsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().replace(/^-\s*/, ''))
        .filter(Boolean);
      console.log("Extracted missing skills count:", result.missingSkills.length);
    } else {
      console.warn("Failed to extract missing skills from response");
    }
    
    // Extract profile summary
    const summaryRegex = /Profile\s+Summary:(.*?)(?:Feedback:|Missing\s+Skills:|$)/is;
    const summaryMatch = text.match(summaryRegex);
    if (summaryMatch && summaryMatch[1]) {
      result.profileSummary = summaryMatch[1].trim();
      console.log("Extracted profile summary length:", result.profileSummary.length);
    } else {
      console.warn("Failed to extract profile summary from response");
    }
    
    // Extract feedback
    const feedbackRegex = /Feedback:(.*?)$/is;
    const feedbackMatch = text.match(feedbackRegex);
    if (feedbackMatch && feedbackMatch[1]) {
      result.feedback = feedbackMatch[1].trim();
    }
    
    return result;
  } catch (e) {
    console.error("Error parsing AI response:", e);
    return result;
  }
}
