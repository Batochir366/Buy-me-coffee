import { Button } from "@/components/ui/button";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";

export default function page() {
  return (
    <div className="w-1/2 h-screen flex justify-center">
      <div className="flex flex-col size-fit pt-[192px] gap-[238px]">
        <div className="flex justify-between">
          <div></div>
          <Button className="bg-[#F4F4F5] text-black hover:bg-black/20">
            Log in
          </Button>
        </div>
        <Step1 />
        {/* <Step2 /> */}
      </div>
    </div>
  );
}
