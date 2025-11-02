import {
  Users,
  Command,
  TicketCheck,
  CalendarCog,
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";
import {
  Sidebar,
  SidebarMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { getUser } from "@/utils/user";
import { NavUser } from "@/components/nav-user";
import { useLocation, Link } from "react-router-dom";

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const user = getUser();

  const navMain = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Events", url: "/events", icon: CalendarDays },
    { title: "My Registrations", url: "/my-registrations", icon: TicketCheck },
    {
      title: "Manage Events",
      url: "/manage-events",
      icon: CalendarCog,
      adminOnly: true,
    },
    {
      title: "Manage Registrations",
      url: "/manage-registrations",
      icon: Users,
      adminOnly: true,
    },
  ];

  const visibleNav = navMain.filter(
    (item) => !item.adminOnly || user?.role === "admin"
  );

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
          {visibleNav.map((item) => {
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
