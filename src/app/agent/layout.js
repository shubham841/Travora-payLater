import { currentUser } from "@clerk/nextjs/server";
import Provider from "./provider";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await currentUser();
    if (!user) {
      return redirect("/auth/agent/login");
    }
  
    const metadata = user.publicMetadata || {};
    if (!metadata.agentOnboarded) {
      return redirect("/auth/agent/onboarding");
    }
  
    const clerkUserId = user.id;

    const res = await fetch(`http://localhost:5000/api/agent/profile?clerkUserId=${clerkUserId}`, {
        cache: "no-store", // make sure to disable caching if you want live data
      });
    
      if (!res.ok) {
        console.error("Failed to fetch agent profile");
        return redirect("/auth/agent/onboarding");
      }
    
      const agent = await res.json();
  return (
    <Provider agentName={agent.full_name}>
      {children}
    </Provider>
  );
}
