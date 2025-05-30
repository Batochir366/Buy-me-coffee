import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Nav } from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen gap-5 h-screen bg-white">
      <Nav />
      <div className="flex pt-[100px] px-[80px] gap-[100px]">
        <Tabs defaultValue="Home" className="size-fit bg-white">
          <TabsList className="flex h-fit w-[250px] bg-white  flex-col gap-2">
            <TabsTrigger className="w-full" value="Home">
              Home
            </TabsTrigger>
            <TabsTrigger className="w-full" value="Explore">
              Explore
            </TabsTrigger>
            <TabsTrigger
              className="flex w-full items-center gap-2"
              value="page"
            >
              View page <ExternalLink />
            </TabsTrigger>
            <TabsTrigger className="w-full" value="Account">
              Account settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  );
}
