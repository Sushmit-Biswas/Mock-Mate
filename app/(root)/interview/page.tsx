import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from 'next/navigation'; // Import redirect

const Page = async () => {
  const user = await getCurrentUser();

  // Add check for user and redirect if not logged in
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      {/* Added top margin */}
      <h3 className="mt-8">Interview generation</h3>

      <Agent
        userName={user.name} // User is guaranteed now, remove ?. and !
        userId={user.id}     // User is guaranteed now, remove ?.
        userPhotoUrl={user.photoURL ?? null} // Pass null explicitly if photoURL is null/undefined
        type="generate"
      />
    </>
  );
};

export default Page;
