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
import { CircleX } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.any(),
});

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(form);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className="w-1/2 h-screen flex justify-center">
      <div className="flex flex-col size-fit pt-[192px] gap-[238px]">
        <div className="flex justify-between">
          <div></div>
          <Button className="bg-[#F4F4F5] text-black hover:bg-black/20">
            Sign up
          </Button>
        </div>
        <div>
          <div className="text-[24px] font-semibold p-6">Welcome back</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <Input placeholder="Enter password here" {...field} />
                      </FormControl>
                      <FormMessage />
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
