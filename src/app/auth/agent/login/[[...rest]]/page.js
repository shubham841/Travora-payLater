"use client";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SignIn } from "@clerk/nextjs";

export default function AgentLoginPage() {
  return (
    <>
    <Header />
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <SignIn signUpUrl="/auth/agent/signup" routing="path" path="/auth/agent/login" afterSignInUrl="/auth/agent/onboarding"/>
    </div>
    <Footer />
    </>
  );
}