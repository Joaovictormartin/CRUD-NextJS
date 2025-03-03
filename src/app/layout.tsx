import "../styles/globals.css";

import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/providers/auth";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD NextJS",
  icons: "/png/icon.png",
  description: "CRUD com nextJS e tailwind",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
