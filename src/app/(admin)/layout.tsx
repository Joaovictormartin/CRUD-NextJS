"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { Loading } from "@/components/loading";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  const { status } = useSession();

  if (status === "unauthenticated") return redirect("/");
  if (status === "loading") return <Loading />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full">
        <SidebarTrigger />
        <div className="mx-auto max-w-[1200px] p-4 pt-4 sm:p-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
