// src/app/agent/signup/page.js
"use client";
import { SignUp } from "@clerk/nextjs";

export default function AgentSignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <SignUp signInUrl="/agent/login" routing="path" path="/agent/signup" />
      
    </div>
  );
}
