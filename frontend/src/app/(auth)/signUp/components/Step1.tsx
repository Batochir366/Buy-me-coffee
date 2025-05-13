"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { port } from "../../../../../utils/env";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircleCheck, CircleX } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2, "choose atleast 2 characters"),
});

export const Step1 = ({
  setStep,
  setUsername,
}: {
  setStep: Dispatch<SetStateAction<boolean>>;
  setUsername: Dispatch<SetStateAction<string>>;
}) => {
  const [reqError, setReqError] = useState("");
  const [reqAvailable, setReqAvailable] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const checkEmailExists = async (values: z.infer<typeof formSchema>) => {
    console.log(values.username);
    try {
      const response = await axios.post(`${port}/auth/check`, values);
      setReqError("");
      setReqAvailable("");
      setUsername("");
      if (response.data.message == "Username already exists") {
        setReqError(response.data.message);
      }
      if (response.data.message == "Username is available") {
        setReqAvailable(response.data.message);
        setTimeout(() => {
          setUsername(values.username);
          setStep(false);
        }, 1500);
      }
    } catch (error) {
      console.error(error, "err");
    }
  };

  const handlerInput = () => {
    setReqError("");
  };

  return (
    <div>
      <div className="text-[24px] font-semibold p-6">
        Create Your Account
        <p className="text-[#71717A] text-[14px] font-light">
          Choose a username for your page
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(checkEmailExists)}>
          <div className="flex flex-col gap-3 pb-6 px-6 w-[355px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col">
                  <FormLabel>Username</FormLabel>
                  <FormControl onChangeCapture={handlerInput}>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                  {reqError && (
                    <div className="flex justify-center items-center gap-2">
                      <CircleX className="size-[14px] text-red-400 stroke-1" />
                      <p className="text-[14px] text-red-400">{reqError}</p>
                    </div>
                  )}
                  {reqAvailable && (
                    <div className="flex justify-center items-center gap-2">
                      <CircleCheck className="size-[14px] text-[#18BA51] stroke-1" />
                      <p className="text-[14px]  text-[#18BA51]">
                        {reqAvailable}
                      </p>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
