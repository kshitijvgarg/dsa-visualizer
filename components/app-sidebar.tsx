import { ArrowRightToLine, ArrowUpAZ, Home, ListChecks, Trees } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ListChecks,
  },
  {
    title: "Queue",
    url: "/queue",
    icon: ArrowRightToLine,
  },
  {
    title: "Tree",
    url: "/tree",
    icon: Trees,
  },
  {
    title: "Sorting",
    url: "/sorting",
    icon: ArrowUpAZ,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Data Structures & Algorithms Visualizer</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex-row-reverse">
        <ModeToggle></ModeToggle>
      </SidebarFooter>
    </Sidebar>
  );
}
