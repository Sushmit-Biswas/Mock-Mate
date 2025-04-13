// Removed "use client"
import Link from "next/link";
import Image from "next/image";
import { Home, Briefcase, Mic } from "lucide-react"; // Icons for desktop nav

import { getCurrentUser } from "@/lib/actions/auth.action"; // Fetch user server-side
import ProfileDropdown from "@/components/ProfileDropdown"; // Client component for dropdown
import MobileNav from "@/components/MobileNav"; // Client component for mobile sheet
import { Button } from "@/components/ui/button"; // For potential Sign In button if needed
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // Add toaster for notifications

// Re-added NAV_LINKS constant
const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#my-interviews", label: "My Interviews", icon: Briefcase }, // Updated href
  { href: "/#other-interviews", label: "Other Interviews", icon: Mic }, // Updated href
  { href: "/resume-checker", label: "Resume Checker", icon: Mic }, // Added Resume Checker
];

// Changed to async function
const Navbar = async () => {
  // Fetch user server-side
  const user = await getCurrentUser();

  // Basic user object structure expected by child components
  const userProps = user ? {
    name: user.name,
    email: user.email,
    photoURL: user.photoURL,
  } : { name: null, email: null, photoURL: null };


  return (
    <>
      {/* Toaster needed for notifications from dropdown/modal */}
      <Toaster position="top-center" richColors />
      {/* Reverted header structure and classes */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4"> {/* Reverted padding */}
          {/* Left Side: Logo and Name */}
          <Link href="/" className="flex items-center gap-3 mr-6"> {/* Reverted gap/margin */}
            <Image src="/logo.svg" alt="MockMate Logo" width={42} height={42} /> {/* Reverted size */}
            {/* Increased font size, reverted hidden class */}
            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent"> 
              MockMate
            </span>
          </Link>

          {/* Middle: Desktop Navigation Links - Reverted structure and styling */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-grow justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-all duration-200 ease-in-out hover:text-primary hover:bg-gray-700/50 rounded-md px-4 py-2 text-base font-medium text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Profile Dropdown / Mobile Nav / Sign In - Reverted structure */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center">
                  {/* Render ProfileDropdown component */}
                  <ProfileDropdown user={userProps} /> 
                </div>
                <div className="flex md:hidden">
                  {/* Pass userProps to MobileNav */}
                  <MobileNav user={userProps} /> 
                </div>
              </>
            ) : (
              <Button asChild className="btn text-base px-6 h-11">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
