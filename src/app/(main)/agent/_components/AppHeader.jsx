import React from "react";
import { CustomTrigger } from "./CustomTrigger";
import { Bell, Link, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
    <div className="flex justify-between items-center rounded-2xl  shadow-sm bg-white m-6 h-14 px-2 md:px-12">
      <div className="flex space-x-8">
        <CustomTrigger />
        <h2 className="font-bold text-blue-700 text-xl">Agent Dashboard</h2>
      </div>
      <div className="flex space-x-12 items-center">
        <Button className="hidden lg:block"> <Search /> </Button>
        <Button className="hidden lg:block"> <Bell /> </Button>
        <Button className="hidden lg:block"> <Settings /> </Button>
        <Button className="hidden lg:block"> <User /> </Button>
        
        <h2 className="font-bold ">Agent Name</h2>
      </div>
    </div>
  );
};

export default AppHeader;
