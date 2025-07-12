import React from "react";
import { CustomTrigger } from "./CustomTrigger";
import { Bell, Link, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  return (
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
          <h2 className="font-bold text-orange">Agent Name</h2>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
