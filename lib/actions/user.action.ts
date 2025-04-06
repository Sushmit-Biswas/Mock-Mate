"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { auth, db } from "@/firebase/admin";

// Get current user ID from session cookie
async function getCurrentUserId(): Promise<string | null> {
  const cookieStore = await cookies(); // Add await back
  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return decodedClaims.uid;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

// Update user's profile picture URL
export async function updateProfilePicture(newPhotoUrl: string) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      throw new Error("User not authenticated.");
    }

    // Validate the newPhotoUrl (ensure it's one of the allowed paths)
    const allowedPaths = ["/dp-1.jpg", "/dp-2.jpg", "/dp-3.jpg", "/dp-4.jpg", "/dp-5.jpg"];
    if (!allowedPaths.includes(newPhotoUrl)) {
        throw new Error("Invalid profile picture selected.");
    }

    const userRef = db.collection("users").doc(userId);

    await userRef.update({
      photoURL: newPhotoUrl,
    });

    // Revalidate relevant paths to update UI
    revalidatePath("/"); // Revalidate layouts using root
    revalidatePath("/interview"); // Revalidate interview generation page

    return { success: true, message: "Profile picture updated successfully." };
  } catch (error: unknown) {
    console.error("Error updating profile picture:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, message: `Failed to update profile picture: ${message}` };
  }
}
