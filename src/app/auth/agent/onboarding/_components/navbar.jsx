"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-1">
          <span className="text-xl font-bold text-blue-600">Pay</span>
          <span className="text-xl font-bold text-black">Later</span>
          <span className="text-sm text-gray-500 ml-2">Agent Portal</span>
        </div>
        <div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            Sign out
          </Button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h3>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <SignOutButton>
                <Button className="bg-red-600 text-white hover:bg-red-700">Sign Out</Button>
              </SignOutButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
