import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';

const RootLayout = async ({children, params}: {children: ReactNode, params: any}) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  
  // Check if current page is home using pathname
  const cookieStore = cookies();
  const path = cookieStore.get('path')?.value || '';
  const isHomePage = path === '/' || path === '';
  
  return (
    // Changed div to main for semantic HTML, added flex-col and min-h-screen
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      {/* Added flex-grow, max-width, centering, and padding */}
      <div className="flex-grow max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {children}
      </div>
      {isHomePage && <Footer />} {/* Conditionally render Footer only on home page */}
    </main>
  );
};

export default RootLayout;
