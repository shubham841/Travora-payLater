"use client";
import { MessageSquare, Home, NotebookText, ClipboardList, Settings,BadgeDollarSign } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
            <h2 className="font-bold text-blue-700 text-2xl mt-12 px-2">Pay Later</h2>
          </SidebarGroupLabel>
            <div className="mt-16 p-2">
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`text-[17px] ${
                            path.includes(item.url) &&
                            "text-primary bg-blue-100"
                          }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
        
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
