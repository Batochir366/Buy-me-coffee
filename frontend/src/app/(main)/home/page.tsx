"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecentTrans } from "./components/RecentTrans";
export default function page() {
  return (
    <div className="h-fit w-[907px] flex flex-col gap-6 px-6">
      <div className=" flex flex-col h-fit w-full p-6 border border-solid border-[#E4E4E7] rounded-lg gap-3">
        <div className="flex justify-between w-full h-fit items-center pb-4">
          <div className="flex items-center gap-3">
            <Image
              className="rounded-full"
              src={"/logo.png"}
              alt=""
              width={48}
              height={48}
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-[16px] font-[700]">Jake</h1>
              <p className="text-[14px]">buymecoffee.com/Jake</p>
            </div>
          </div>
          <Button className="flex justify-center items-center gap-2">
            <Copy /> Share page link
          </Button>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <h1 className="text-[20px] font-[600]">Earings</h1>
            <Select defaultValue="30">
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h1 className="text-[36px] font-[700]">$450</h1>
        </div>
      </div>
      <div className="flex justify-between">
        <h3 className=" font-semibold">Recent transition</h3>
        <Select>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">$1</SelectItem>
            <SelectItem value="2">$2</SelectItem>
            <SelectItem value="5">$5</SelectItem>
            <SelectItem value="10">$10</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" flex flex-col h-fit w-full p-6 border border-solid border-[#E4E4E7] rounded-lg">
        <RecentTrans />
      </div>
    </div>
  );
}
