"use client";
import { Button } from "@/components/ui/button";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { useState } from "react";

export default function page() {
  const [step, setStep] = useState(true);

  return (
    <div className="w-1/2 h-screen flex justify-center">
      <div className="flex flex-col size-fit pt-[400px]">
        {step ? <Step1 setStep={setStep} /> : <Step2 />}
      </div>
    </div>
  );
}
