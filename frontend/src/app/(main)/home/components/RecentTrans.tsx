import Image from "next/image";
import React, { useState } from "react";

export const RecentTrans = () => {
  const text = `Thank you for being so awesome everyday! You always manage to brighten
        up my day when I’m feeling down. Although $1 isn’t that much money it’s
        all I can contribute at the momesdt`;
  const [showMore, setShowMore] = useState(false);
  const HandShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div>
      <div className="flex justify-between w-full h-fit items-center pb-4">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full"
            src={"/logo.png"}
            alt=""
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] font-[700]">Jake</h1>
            <p className="text-[14px]">buymecoffee.com/Jake</p>
          </div>
        </div>
        <div className="flex  flex-col gap-2">
          <h1 className="font-[700]">+ ${"1"}</h1>
          <p className="text-[12px] text-[#71717A]">10 hours ago</p>
        </div>
      </div>
      {text.length >= 193 ? (
        <div className="text-[14px]">
          {showMore ? <p>{text}</p> : <p>{text.slice(0, 193)}... </p>}
          <p onClick={HandShowMore} className=" underline">
            Show more
          </p>
        </div>
      ) : (
        <p className="text-[14px]">{text}</p>
      )}
    </div>
  );
};
