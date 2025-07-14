// src/app/agent/signup/page.js
"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SignUp } from "@clerk/nextjs";

export default function AgentSignupPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <SignUp signInUrl="/auth/agent/login" routing="path" path="/auth/agent/signup" afterSignUpUrl="/auth/agent/onboarding"/>

      </div>
      <Footer />
    </>
  );
}
