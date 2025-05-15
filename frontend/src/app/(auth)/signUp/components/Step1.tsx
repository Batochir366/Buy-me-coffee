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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CircleCheck } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
export const Step1 = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setUserName } = useContext(AuthContext);

  const checkEmailExists = async (username: string) => {
    try {
      const response = await axios.post(`${port}/auth/check`, { username });
      if (response.status === 200) setUserName(username);
      return true;

      return false;
    } catch (error) {
      return false;
    }
  };

  const formSchema = z.object({
    username: z
      .string()
      .min(2, "choose atleast 2 characters")
      .refine(checkEmailExists, {
        message: "Username already exists",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <div>
      <div className="text-[24px] font-semibold p-6">
        Create Your Account
        <p className="text-[#71717A] text-[14px] font-light">
          Choose a username for your page
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => setStep(false))}>
          <div className="flex flex-col gap-3 pb-6 px-6 w-[355px]">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                  {form.formState.isValid && (
                    <div className="flex justify-center items-center gap-2">
                      <CircleCheck className="size-[14px] text-[#18BA51] stroke-1" />
                      <p className="text-[14px]  text-[#18BA51]">
                        Username is available
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
