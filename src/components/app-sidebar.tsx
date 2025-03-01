"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavUser } from "./nav-user";
import { menuOptions } from "@/constants/menu-options";

export function AppSidebar() {
  const { data } = useSession();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mx-auto pb-10 pt-8">
        <Image
          alt="icon"
          width={50}
          height={50}
          src={"/png/icon.png"}
          className="rounded-full"
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuOptions.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={url}
                      className={cn(
                        url.split("/")[1] === pathname.split("/")[1] &&
                          "bg-[#0a6d01]/15 hover:bg-[#0a6d01]/15",
                      )}
                    >
                      <Icon size={20} className="stroke-[#107E0B]" />
                      <span className="text-base font-medium">{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {data?.user && <NavUser user={data?.user} />}
      </SidebarFooter>
    </Sidebar>
  );
}
