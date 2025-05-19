import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export const DashboardProfile = () => {
  const text = `All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity`;
  const [showMore, setShowMore] = useState(false);
  const HandShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="size-fit p-6 border border-solid border-[#E4E4E7] rounded-lg">
      <div className="flex justify-between w-full h-fit items-center pb-4">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            src={"/Profile.png"}
            alt=""
            width={40}
            height={40}
          />
          <h1 className="text-[20px] font-semibold">Space ranger</h1>
        </div>
        <Button className="flex items-center gap-2 bg-[#F4F4F5] hover:bg-black/0 text-black">
          View page <ExternalLink />
        </Button>
      </div>
      <div className="flex gap-5">
        <div className="gap-[14px] flex flex-col">
          <h1 className="text-[16px] font-semibold">About {"Space ranger"}</h1>
          <p className="text-[14px]">{text.slice(0, 247)}...</p>
        </div>
        <div className="gap-[14px] flex flex-col">
          <h1 className="text-[16px] font-semibold">Social media URL</h1>
          <p className="text-[14px] underline">
            {"https://buymeacoffee.com/baconpancakes1"}
          </p>
        </div>
      </div>
    </div>
  );
};
