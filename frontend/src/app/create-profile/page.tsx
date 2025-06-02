"use client";
import React, { useState } from "react";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";

export default function page() {
  const [step, setStep] = useState(true);
  return <>{step ? <Step1 setStep={setStep} /> : <Step2 />}</>;
}
