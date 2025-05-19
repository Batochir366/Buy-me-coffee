"use client";

import { Input } from "@/components/ui/input";
import { DashboardProfile } from "./components/DashboardProfile";

export default function page() {
  return (
    <div className="size-fit flex flex-col gap-6 rounded-lg">
      <h1 className="text-[20px] font-semibold">Explore creators</h1>
      <div className="w-[247px]">
        <Input placeholder="Search name" />
      </div>
      <div className=" max-h-[1000px] overflow-scroll flex flex-col gap-6 py-6">
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
        <DashboardProfile />
      </div>
    </div>
  );
}
