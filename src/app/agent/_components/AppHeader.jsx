"use client"
import React, {useState} from "react";
import { CustomTrigger } from "./CustomTrigger";
import { Bell, Link, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";


const AppHeader = ({name}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className="flex justify-between items-center rounded-2xl  shadow-sm bg-white  my-6 mx-4 md:m-6 h-14 px-2 md:px-4">
      <div className="flex space-x-5">
        <CustomTrigger />
        <h2 className="font-bold text-hardBlue text-xl">Agent Dashboard</h2>
      </div>
      <div className="flex space-x-3 items-center">
        <div className="flex">
          <Button className="hidden lg:block">
            {" "}
            <Search />{" "}
          </Button>
          <Button className="hidden lg:block">
            {" "}
            <Bell />{" "}
          </Button>
          <Button className="hidden lg:block">
            {" "}
            <Settings />{" "}
          </Button>
          <Button className="hidden lg:block">
            {" "}
            <User />{" "}
          </Button>
        </div>

        <div className="flex">
          <h2 className="font-bold text-orange">{name}</h2>
        </div>
        <Button
            onClick={() => setOpen(true)}
            className="bg-green-900 text-primary-foreground shadow hover:bg-primary/90"
          >
            Sign out
          </Button>
      </div>
    </div>
    
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

export default AppHeader;
