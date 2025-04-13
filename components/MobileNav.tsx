"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Menu, LogOut, Image as ImageIcon, Home, Briefcase, Mic } from "lucide-react"; // Removed X, UserCircle

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfilePictureModal from "@/components/ProfilePictureModal"; // Import the modal
import { signOut } from "@/lib/actions/auth.action"; // Import signOut action
import { cn } from "@/lib/utils"; // For conditional classes

interface MobileNavProps {
  user: { // Expect user object with necessary details
    name?: string | null;
    email?: string | null;
    photoURL?: string | null;
  };
}

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#my-interviews", label: "My Interviews", icon: Briefcase },
  { href: "/#other-interviews", label: "Other Interviews", icon: Mic },
  { href: "/resume-checker", label: "Resume Checker", icon: Mic },
];

const MobileNav: React.FC<MobileNavProps> = ({ user }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out successfully.");
      setIsSheetOpen(false); // Close sheet on logout
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
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-dark-300 h-12 w-12 flex items-center justify-center">
            <Menu className="size-8" /> {/* Increased icon size from h-6/w-6 to h-8/w-8 */}
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-200 border-gray-700 text-white w-[320px] sm:w-[380px] flex flex-col p-0">
          <SheetHeader className="p-5 border-b border-gray-700">
            <SheetTitle asChild>
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsSheetOpen(false)}>
                <Image src="/logo.svg" alt="MockMate Logo" width={32} height={32} />
                <span className="text-2xl font-bold text-white">MockMate</span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-5 p-5 flex-grow overflow-y-auto">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.photoURL ?? undefined} alt={user.name ?? "User"} />
                <AvatarFallback className="bg-gray-600 text-white text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-base font-medium leading-none">{user.name ?? "User"}</p>
                <p className="text-sm leading-none text-muted-foreground text-gray-400">
                  {user.email ?? ""}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start gap-2.5 text-white border-gray-600 hover:bg-dark-300 text-base h-11"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <ImageIcon className="h-5 w-5" /> Change Picture
            </Button>

            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href.startsWith('/#') && pathname === '/');
                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all hover:bg-dark-300 text-base",
                        isActive ? "bg-dark-400 text-user-primary" : "text-gray-300"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </div>

          <SheetFooter className="mt-auto border-t border-gray-700 p-5">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2.5 text-red-500 hover:bg-dark-300 hover:text-red-400 text-base h-11"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="h-5 w-5" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Render the profile picture modal */}
      <ProfilePictureModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        currentPhotoUrl={user.photoURL}
      />
    </>
  );
};

export default MobileNav;
