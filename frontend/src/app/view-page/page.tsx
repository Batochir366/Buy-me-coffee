"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import React from "react";
import { TalentProfile } from "./components/TalentProfile";
import { Coffee } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Textarea } from "@/components/ui/textarea";
const formSchema = z.object({
  URL: z
    .string()
    .min(2, {
      message: "at least 2 characters.",
    })
    .url(),
  message: z.string().min(2, {
    message: "message must be at least 2 characters.",
  }),
});

export default function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      URL: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="size-full relative">
      <Image
        width={1920}
        height={319}
        className="w-full h-[320px] -z-20"
        src="/cover.png"
        alt="cover image"
      />
      <div className="size-full absolute flex gap-5 z-30 px-[80px] pb-[60px] top-[223px]">
        <TalentProfile />
        <div className="w-full h-fit flex flex-col p-6 gap-5 bg-white border border-solid border-[#E4E4E7] rounded-lg pb-[80px]">
          <div className="flex flex-col gap-3 ">
            <h1 className="text-[24px] text-nowrap font-semibold">
              Buy a {"Space ranger"} a coffee
            </h1>
            <div className="flex flex-col gap-2">
              <p className="font-medium">select amount:</p>
              <div className="flex gap-3">
                <Tabs defaultValue="5" className="bg-white">
                  <TabsList className="bg-white gap-3 flex size-fit">
                    <TabsTrigger
                      className="bg-[#F4F4F5] hover:bg-black/20 text-black flex px-4 py-2"
                      value="1"
                    >
                      <Coffee />
                      $1
                    </TabsTrigger>
                    <TabsTrigger
                      className="bg-[#F4F4F5] hover:bg-black/20 text-black flex px-4 py-2"
                      value="2"
                    >
                      <Coffee />
                      $2
                    </TabsTrigger>
                    <TabsTrigger
                      className="bg-[#F4F4F5] hover:bg-black/20 text-black flex px-4 py-2"
                      value="5"
                    >
                      <Coffee />
                      $5
                    </TabsTrigger>
                    <TabsTrigger
                      className="bg-[#F4F4F5] hover:bg-black/20 text-black flex px-4 py-2"
                      value="10"
                    >
                      <Coffee />
                      $10
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full"
                >
                  <FormField
                    control={form.control}
                    name="URL"
                    render={({ field }) => (
                      <FormItem className="items-start flex flex-col">
                        <FormLabel>
                          Enter BuyMeCoffee or social acount URL:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter BuyMeCoffee or social acount URL:"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="items-start flex flex-col">
                        <FormLabel>Special message</FormLabel>
                        <FormControl>
                          <Textarea
                            maxLength={300}
                            placeholder="Enter message here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Support
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
