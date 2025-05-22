import Image from "next/image";
import React from "react";

export const ResentSupporters = ({ userName }: { userName: string }) => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full"
          src={"/logo.png"}
          alt=""
          width={40}
          height={40}
        />
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <h1 className="text-[16px] font-[700]">{userName}</h1>
            <p className="font-medium">bought ${"1"} coffee</p>
          </div>

          <p className="text-[14px]">
            Thank you for being so awesome everyday! You always manage to
            brighten up my day when I’m feeling down. Although $1 isn’t that
            much money it’s all I can contribute at the moment.
          </p>
        </div>
      </div>
    </div>
  );
};
