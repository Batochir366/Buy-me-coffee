"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { port } from "../../../../../utils/env";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email, example@gmail.com"),
  password: z.string().min(8, "password must be atleast 8 characters"),
});

export const Step2 = ({ username }: { username: string }) => {
  const [isShow, setIsShow] = useState(false);
  const handleIsShow = () => {
    setIsShow(!isShow);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const createUser = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${port}/user`, {
        ...values,
        name: username,
      });
      console.log(response);
    } catch (error) {
      console.log(error, "err");
    }
  };

  return (
    <div>
      <div className="text-[24px] font-semibold p-6">
        Welcome,{username}
        <p className="text-[#71717A] text-[14px] font-light">
          Connect email and set a password
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(createUser)}>
          <div className="flex flex-col gap-3 pb-6 px-6 w-[355px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-start flex-col">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className={` focus-visible:ring-0 ${
                        field.value.length >= 8 &&
                        "focus-visible:border-[#18BA51] border-solid border-2"
                      }`}
                      type={`${!isShow ? "password" : "text"}`}
                      placeholder="password must be atleast 8 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isShow ? (
              <Eye
                onClick={handleIsShow}
                className="text-gray-400 size-4 cursor-pointer"
              />
            ) : (
              <EyeClosed
                onClick={handleIsShow}
                className="text-gray-400 size-4 cursor-pointer"
              />
            )}

            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
