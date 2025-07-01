import { currentUser } from "@clerk/nextjs/server";
import AgentOnboardingForm from "@/components/AgentOnboardingForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  // ❌ If user is not logged in
  if (!user) {
    return redirect("/agent/login");
  }

  // ✅ Check if onboarding is already completed
  const metadata = user.publicMetadata || {};
  if (metadata.agentOnboarded === true) {
    return redirect("/dashboard"); // or wherever you want
  }

  return <AgentOnboardingForm />;
}
