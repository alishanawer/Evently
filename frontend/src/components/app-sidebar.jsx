"use client";

import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Command,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";

export function AppSidebar({ ...props }) {
  const location = useLocation();

  const navMain = [
    { title: "Dashboard", url: "/", icon: SquareTerminal },
    { title: "Events", url: "/events", icon: Bot },
    { title: "Tickets", url: "/tickets", icon: BookOpen },
    { title: "Settings", url: "/settings", icon: Settings2 },
  ];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Evently</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navMain.map((item) => {
            const isActive =
              location.pathname === item.url ||
              (item.url !== "/" && location.pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link
                    to={item.url}
                    className={isActive ? "font-medium text-primary" : ""}>
                    <item.icon className="size-4 mr-2" />
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
