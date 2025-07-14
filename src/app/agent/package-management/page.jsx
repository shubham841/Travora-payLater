// ✅ Server Component
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import PackageManagementClient from './_components/PackageManagementClient';



export default async function PackageManagementPage() {
  const user = await currentUser();

  if (!user) return redirect("/auth/agent/login");

  const metadata = user.publicMetadata || {};
  if (!metadata.agentOnboarded) return redirect("/auth/agent/onboarding");
  // console.log(user.id);
  return (
    <div className="overflow-hidden">
      <PackageManagementClient clerkUserId={user.id}/>
    </div>
  );
}
