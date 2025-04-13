"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FileUp, FileCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploaderProps {
  onFileChange: (file: File | null) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (file.type !== 'application/pdf') {
      toast.error("Please upload a PDF file");
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return false;
    }
    
    return true;
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
      onFileChange(file);
    } else {
      setFile(null);
      onFileChange(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all",
            isDragging 
              ? "border-primary-200 bg-primary-200/10" 
              : "border-gray-700 hover:border-primary-200"
          )}
          onClick={handleButtonClick}
        >
          <FileUp className="h-10 w-10 text-light-400 mb-4" />
          <p className="text-center mb-2">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-light-400 text-center">PDF (Max 5MB)</p>
        </div>
      ) : (
        <div className="border rounded-lg p-4 flex items-center justify-between bg-dark-200">
          <div className="flex items-center">
            <FileCheck className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-xs text-light-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleRemoveFile}
            className="text-light-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf"
        className="hidden"
      />
    </div>
  );
};

export default ResumeUploader;
