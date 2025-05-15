"use client";

import { Nav } from "@/components/Nav";
import { AuthContext } from "@/context/AuthContext";

import Image from "next/image";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userName, setUserName] = useState("");
  return (
    <div className="flex w-screen gap-5 h-screen bg-white">
      <Nav />
      <div className="flex flex-col w-1/2 items-center bg-[#FBBF24]">
        <div className="flex flex-col size-fit pt-[400px]">
          <div className="flex w-full flex-col justify-center items-center">
            <Image src="/logo.png" width={240} height={240} alt="logoImg" />
            <div className=" flex flex-col justify-center items-center gap-3 pt-[40px] text-black">
              <p className="font-[700] text-[24px]"> Fund your creative work</p>
              <p className="text-[16px]">
                Accept support. Start a membership. Setup a shop. It’s easier
                than you think.
              </p>
            </div>
          </div>
        </div>
      </div>
      <AuthContext.Provider value={{ userName, setUserName }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
}
