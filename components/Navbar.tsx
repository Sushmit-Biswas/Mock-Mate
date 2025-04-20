// Removed "use client"
import Link from "next/link";
import Image from "next/image";
import { Home, Briefcase, Mic, FileText } from "lucide-react"; // Added FileText icon

import { getCurrentUser } from "@/lib/actions/auth.action"; // Fetch user server-side
import ProfileDropdown from "@/components/ProfileDropdown"; // Client component for dropdown
import MobileNav from "@/components/MobileNav"; // Client component for mobile sheet
import { Button } from "@/components/ui/button"; // For potential Sign In button if needed
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // Add toaster for notifications

// Re-added NAV_LINKS constant with improved icon choices
const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#my-interviews", label: "My Interviews", icon: Briefcase },
  { href: "/#other-interviews", label: "Other Interviews", icon: Mic },
  { href: "/resume-checker", label: "Resume Checker", icon: FileText }, // Changed to FileText icon
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
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Left Side: Logo and Name */}
          <Link href="/" className="flex items-center gap-3 mr-6">
            <Image src="/logo.svg" alt="MockMate Logo" width={42} height={42} />
            <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-violet-500 bg-clip-text text-transparent"> 
              MockMate
            </span>
          </Link>

          {/* Middle: Desktop Navigation Links - Enhanced with better styling and animations */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-grow justify-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 transition-all duration-300 rounded-md px-4 py-2.5 text-base font-medium overflow-hidden group",
                  "hover:text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-violet-500/20",
                  "active:scale-95 active:duration-150",
                  "before:absolute before:inset-x-0 before:bottom-0 before:h-[2px] before:bg-gradient-to-r before:from-green-400 before:to-violet-500 before:translate-y-2 before:opacity-0 before:transition-all before:duration-300",
                  "hover:before:translate-y-0 hover:before:opacity-100",
                  "text-gray-300"
                )}
              >
                <link.icon className="w-5 h-5 text-primary-200 group-hover:text-white group-hover:rotate-6 transition-all duration-300 ease-in-out" />
                <span className="relative">
                  {link.label}
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-green-400/0 via-violet-400/90 to-green-400/0 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Right Side: Profile Dropdown / Mobile Nav / Sign In */}
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
