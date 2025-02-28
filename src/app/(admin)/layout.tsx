import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen w-full">
        <SidebarTrigger />
        <div className="mx-auto max-w-[1200px] p-8 pt-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
