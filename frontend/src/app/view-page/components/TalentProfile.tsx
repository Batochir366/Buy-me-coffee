"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useState } from "react";
import { ResentSupporters } from "./ResentSupporters";
import { ChevronDown, ChevronUp } from "lucide-react";

export const TalentProfile = () => {
  const mockdata = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [seeMore, setSeeMore] = useState(true);
  const HandleSeeMore = () => {
    setSeeMore(!seeMore);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full h-fit flex flex-col p-6 gap-5 bg-white border border-solid border-[#E4E4E7] rounded-lg">
        <div className="flex items-center gap-3 ">
          <Image
            className="rounded-full"
            src={"/Profile.png"}
            alt=""
            width={48}
            height={48}
          />
          <h1 className="text-[20px] text-nowrap font-semibold">
            Space ranger
          </h1>
        </div>
        <Separator />
        <h1 className="text-[16px] font-semibold">About {"Space ranger"}</h1>
        <p className="text-[14px]">
          All day, every day, we're watching, listening to, reading and
          absorbing politics. It's exhausting. We then report on what we've seen
          in a way that's as chill as possible. None of the sensationalism and
          division you'll find elsewhere. It's about clarity, focus,
          approachability, and having a little wry smile almost all the time.
        </p>
      </div>
      <div className="w-full h-fit flex flex-col p-6 gap-5 bg-white border border-solid border-[#E4E4E7] rounded-lg">
        <h1 className="text-[16px] font-semibold">Social media link</h1>
        <p className="text-[14px] underline">
          https://buymeacoffee.com/spacerulz44
        </p>
      </div>
      <div className="w-full max-h-[800px] overflow-scroll flex flex-col p-6 gap-5 bg-white border border-solid border-[#E4E4E7] rounded-lg">
        <h1 className="text-[16px] font-semibold">Recent Supporters</h1>
        {seeMore ? (
          <>
            {mockdata.slice(0, 4).map((value, index) => (
              <ResentSupporters key={index} userName={value} />
            ))}
          </>
        ) : (
          <>
            {mockdata.map((value, index) => (
              <ResentSupporters key={index} userName={value} />
            ))}
          </>
        )}
      </div>
      <div
        onClick={HandleSeeMore}
        className="w-full h-fit flex py-2 justify-center items-center gap-2 bg-white border border-solid border-[#E4E4E7] rounded-lg cursor-pointer"
      >
        See More
        {seeMore ? <ChevronDown /> : <ChevronUp />}
      </div>
    </div>
  );
};
