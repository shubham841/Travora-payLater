import { currentUser } from "@clerk/nextjs/server";
import AgentOnboardingForm from "@/components/AgentOnboardingForm";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

export default async function Page() {
  const user = await currentUser();

  // ❌ If user is not logged in
  if (!user) {
    return redirect("/auth/agent/login");
  }

  // ✅ Check if onboarding is already completed
  const metadata = user.publicMetadata || {};
  if (metadata.agentOnboarded === true) {
    return redirect("/agent/dashboard"); // or wherever you want
  }

  return <><Navbar></Navbar><AgentOnboardingForm /></>;
}
