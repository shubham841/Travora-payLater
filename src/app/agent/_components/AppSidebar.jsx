"use client";
import { MessageSquare, Home, NotebookText, ClipboardList, Settings,BadgeDollarSign } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/agent/dashboard",
    icon: Home,
  },
  {
    title: "Package Management",
    url: "/agent/package-management",
    icon: ClipboardList,
  },
  {
    title: "Bookings",
    url: "/agent/bookings",
    icon: NotebookText,
  },
  {
    title: "Commission & Payouts",
    url: "/agent/commission-payouts",
    icon: BadgeDollarSign,
  },
  {
    title: "Support",
    url: "/agent/support",
    icon: MessageSquare,
  },
];
export default function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {/* <h2 className="font-bold text-hardBlue text-2xl mt-24 px-2">Pay Later</h2> */}
          </SidebarGroupLabel>
            <div className="mt-6 px-4">
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`text-[20px] my-2 ${
                            path.includes(item.url) &&
                            "text-primary bg-blue-50"
                          }`}
                        >
                          <item.icon/>
                          <div className="mt-1 text-center h-7">{item.title}</div>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
        
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
         <div className="leftSide absolute right-6 bottom-3">
          <Link href="/">
            <div>
              <p className="text-[#0057D8] font-bold text-2xl ">Pay Later</p>
              <p className="text-[#0057D8] font-bold mt-2">By Travora </p>
            </div>
          </Link>
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}
