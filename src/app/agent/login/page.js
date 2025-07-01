"use client";
import { SignIn } from "@clerk/nextjs";

export default function AgentLoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <SignIn signUpUrl="/agent/signup" routing="path" path="/agent/login" />
    </div>
  );
}