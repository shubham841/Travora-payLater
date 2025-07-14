// "use client"

import React from 'react'
import Dashboard from './_components/dashboard'
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";





const Page = async () => {
  const user = await currentUser();

  console.log(currentUser)
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
  console.log(agent);

  return <div className='overflow-hidden'>
    <Dashboard agent={agent}/>
  </div>

}

export default Page
