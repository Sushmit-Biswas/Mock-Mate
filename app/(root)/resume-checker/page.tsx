import { redirect } from 'next/navigation';
import { getCurrentUser } from "@/lib/actions/auth.action";
import ResumeChecker from '@/components/ResumeChecker';

const ResumeCheckerPage = async () => {
  const user = await getCurrentUser();

  // Redirect if user is not logged in
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <h3 className="mt-8">Resume ATS Checker</h3>
      
      <div className="mt-6 sm:mt-8">
        <ResumeChecker userId={user.id} />
      </div>
    </>
  );
};

export default ResumeCheckerPage;
