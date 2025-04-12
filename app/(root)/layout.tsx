import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cookies } from 'next/headers';
import '@/styles/card-animations.css'; // Import the CSS file for animations

const RootLayout = async ({children, params}: {children: ReactNode, params: any}) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }
  
  // Check if current page is home using pathname
  const cookieStore = await cookies();
  const path = cookieStore.get('path')?.value || '';
  const isHomePage = path === '/' || path === '';
  
  return (
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
