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
import { useState } from "react";
import { CircleX } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.any(),
});

export default function page() {
  const [reqError, setReqError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const Login = async (values: z.infer<typeof formSchema>) => {
    try {
      setReqError("");
      const response = await axios.post(`http://localhost:8080/auth`, values, {
        withCredentials: true,
      });
      if (response.data.message == "User not found") {
        setReqError(response.data.message);
      }
      if (response.data.message == "Email or Password wrong") {
        setReqError(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="w-1/2 h-screen flex justify-center">
      <div className="flex flex-col size-fit pt-[400px]">
        <div>
          <div className="text-[24px] font-semibold p-6">Welcome back</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(Login)}>
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
                          type="password"
                          placeholder="Enter password here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      {reqError && (
                        <div className="flex justify-center items-center gap-2">
                          <CircleX className="size-[14px] text-red-400 stroke-1" />
                          <p className="text-[14px] text-red-400">{reqError}</p>
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
      </div>
    </div>
  );
}
