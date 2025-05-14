"use client";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export const Nav = () => {
  return (
    <div className="flex absolute w-full py-4 px-[80px] justify-between">
      <div className="flex gap-2 text-[16px] font-[700]">
        <Coffee className="stroke-2" />
        Buy Me Coffee
      </div>
      <Button className="bg-[#F4F4F5] text-black hover:bg-black/20">
        Sign up
      </Button>
      <Button className="bg-[#F4F4F5] text-black hover:bg-black/20">
        Log In
      </Button>
    </div>
  );
};
