import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm w-full border-b-1 flex items-center">
      <nav className="container flex mx-4 md:mx-auto h-24 items-center justify-between ">
        <div className="leftSide flex md:ml-4">
          <Link href="/">
            <div>
              <p className="text-blue-500 font-bold text-3xl ">Pay Later</p>
              <p className="text-blue-500 font-bold mt-2">By Travora </p>
            </div>
          </Link>
        </div>

        <div className="rightSide flex items-center">
          <div className="space-x-2 md:space-x-6 mr-32">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <span className="hidden  lg:block text-black text-lg ">
                    Packages
                  </span>
                  <ChevronDown className="hidden lg:block h-4 w-4 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/"} className="flex items-center gap-2">
                    <span>Travel List</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <span className="hidden lg:block text-black text-lg">
                    Agents
                  </span>
                  <ChevronDown className="hidden lg:block h-4 w-4 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/"} className="flex items-center gap-2">
                    <span> Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <span className="hidden lg:block text-black text-lg">
                    Support
                  </span>
                  <ChevronDown className="hidden lg:block h-4 w-4 text-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/"} className="flex items-center gap-2">
                    <span> Feedback</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="btn">
            <Button className="bg-[#F28500] text-white text-base px-5 py-2 md:mr-4 rounded-xl hover:bg-orange-600 hover:shadow-lg hover:scale-105 transition-all duration-300">
              Login
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
