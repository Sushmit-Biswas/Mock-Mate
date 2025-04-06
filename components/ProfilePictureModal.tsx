"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { updateProfilePicture } from "@/lib/actions/user.action"; // Import the server action

interface ProfilePictureModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPhotoUrl: string | null | undefined;
}

const PRELOADED_IMAGES = [
  "/dp-1.jpg",
  "/dp-2.jpg",
  "/dp-3.jpg",
  "/dp-4.jpg",
  "/dp-5.jpg",
];

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  isOpen,
  setIsOpen,
  currentPhotoUrl,
}) => {
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(
    currentPhotoUrl ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = (url: string) => {
    setSelectedPhotoUrl(url);
  };

  const handleSaveChanges = async () => {
    if (!selectedPhotoUrl) {
      toast.error("Please select an image.");
      return;
    }
    if (selectedPhotoUrl === currentPhotoUrl) {
      setIsOpen(false); // No changes made
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateProfilePicture(selectedPhotoUrl);
      if (result.success) {
        toast.success("Profile picture updated successfully!");
        setIsOpen(false);
      } else {
        toast.error(result.message || "Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-dark-200 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Change Profile Picture</DialogTitle>
          <DialogDescription>
            Select one of the pre-loaded images below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {PRELOADED_IMAGES.map((url) => (
            <div
              key={url}
              className={`relative aspect-square cursor-pointer rounded-full overflow-hidden border-2 ${
                selectedPhotoUrl === url
                  ? "border-user-primary"
                  : "border-transparent hover:border-gray-500"
              }`}
              onClick={() => handleSelectImage(url)}
            >
              <Image
                src={url}
                alt={`Profile picture option ${url.slice(-5, -4)}`}
                fill
                sizes="(max-width: 768px) 30vw, 100px" // Adjust sizes as needed
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button
            type="button"
            onClick={handleSaveChanges}
            disabled={isLoading || !selectedPhotoUrl || selectedPhotoUrl === currentPhotoUrl}
            className="btn"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePictureModal;
