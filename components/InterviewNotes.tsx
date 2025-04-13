"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PencilLine, Save } from "lucide-react";

interface InterviewNotesProps {
  interviewId: string;
}

const InterviewNotes: React.FC<InterviewNotesProps> = ({ interviewId }) => {
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const storageKey = `interview-notes-${interviewId}`;
  
  // Load saved notes on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [storageKey]);
  
  const handleSaveNotes = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(storageKey, notes);
      toast.success("Notes saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="bg-dark-300 rounded-lg border border-gray-700 p-4 mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <PencilLine size={18} />
          Personal Notes
        </h3>
        {notes && !isEditing && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </div>
      
      {isEditing || !notes ? (
        <>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your personal reflections and notes about this interview..."
            className="bg-dark-200 border border-gray-700 text-white rounded-md w-full p-3 min-h-[120px]"
          />
          <div className="flex justify-end gap-2 mt-3">
            {notes && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsEditing(false);
                  setNotes(localStorage.getItem(storageKey) || "");
                }}
              >
                Cancel
              </Button>
            )}
            <Button 
              size="sm"
              onClick={handleSaveNotes}
              disabled={isSaving}
              className="flex gap-2 items-center"
            >
              <Save size={16} />
              {isSaving ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-dark-200 p-3 rounded whitespace-pre-wrap text-white/90">
          {notes || "No notes yet. Click 'Edit' to add some."}
        </div>
      )}
    </div>
  );
};

export default InterviewNotes;
