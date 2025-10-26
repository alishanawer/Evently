import { Outlet, useLocation, Link } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Build breadcrumb data dynamically
  const breadcrumbs = pathParts.map((part, index) => {
    const path = "/" + pathParts.slice(0, index + 1).join("/");

    // Label logic
    const label =
      part === "events"
        ? "Events"
        : /^\d+$/.test(part) // If part is numeric (event ID)
        ? "Event Details"
        : part
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

    return { label, path };
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            {/* Dynamic Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.length === 0 ? (
                  // Dashboard page
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  breadcrumbs.map((crumb, index) => (
                    <BreadcrumbItem key={crumb.path}>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink asChild>
                            <Link to={crumb.path}>{crumb.label}</Link>
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  ))
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main content area */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
