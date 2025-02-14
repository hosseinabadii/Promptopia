import { Suspense } from "react";
import { auth } from "@/auth";
import Profile from "@/components/Profile";
import PromptListSkeleton from "@/components/PromptListSkeleton";
import NotAuthorized from "@/components/NotAuthorized";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return (
      <NotAuthorized message={"You must be logged in to view your profile."} />
    );
  }

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{user?.name} Profile</span>
      </h1>
      <p className="desc text-left">
        Welcome to your personalized profile page
      </p>
      <Suspense fallback={<PromptListSkeleton />}>
        <Profile userId={user?.id} />
      </Suspense>
    </section>
  );
}
