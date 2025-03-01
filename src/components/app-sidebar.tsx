"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { UsersRound, Plus } from "lucide-react";

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
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";

const items = [
  { icon: UsersRound, url: "/clients", title: "Clientes" },
  { icon: Plus, url: "/register-customer", title: "Cadastrar Cliente" },
];

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={cn(
                        item?.url.split("/")[1] === pathname.split("/")[1] &&
                          "bg-[#0a6d01]/15 hover:bg-[#0a6d01]/15",
                      )}
                    >
                      <item.icon className="h-6 w-6 stroke-[#107E0B]" />
                      <span className="text-base font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "Joao Victor",
            email: "devjoaovictor10@gmail.com",
            avatar: "https://github.com/Joaovictormartin.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
