"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image"; // Removed unused import
import { toast } from "sonner";
import { LogOut, Image as ImageIcon } from "lucide-react"; // Removed unused UserCircle

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ProfilePictureModal from "@/components/ProfilePictureModal"; // Import the modal
import { signOut } from "@/lib/actions/auth.action"; // Import signOut action

interface ProfileDropdownProps {
  user: { // Expect user object with necessary details
    name?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out successfully.");
      router.push("/sign-in"); // Redirect to sign-in page
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.photoURL ?? undefined} alt={user.name ?? "User"} />
              <AvatarFallback className="bg-gray-600 text-white text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-dark-200 border-gray-700 text-white" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1.5">
              <p className="text-base font-medium leading-none">{user.name ?? "User"}</p>
              <p className="text-sm leading-none text-muted-foreground text-gray-400">
                {user.email ?? ""}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem
            className="cursor-pointer hover:bg-dark-300 text-base"
            onSelect={() => setIsModalOpen(true)}
          >
            <ImageIcon className="mr-2.5 h-5 w-5" />
            <span>Change Picture</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-700" />
          <DropdownMenuItem
            className="cursor-pointer hover:bg-dark-300 text-red-500 hover:text-red-400 text-base"
            onSelect={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2.5 h-5 w-5" />
            <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render the modal */}
      <ProfilePictureModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        currentPhotoUrl={user.photoURL}
      />
    </>
  );
};

export default ProfileDropdown;
