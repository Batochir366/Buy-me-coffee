"use client";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { uploadImage } from "../../../../utils/Image";
import Image from "next/image";
import { Check, ChevronsUpDown, CircleX } from "lucide-react";

import axios from "axios";
import { port } from "../../../../utils/env";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  firstname: z
    .string()
    .min(1, "Please enter name")
    .min(2, "name must be 2 characters")
    .max(16, "name must be in 16 characters"),
  lastname: z
    .string()
    .min(1, "Please enter name")
    .min(2, "name must be 2 characters")
    .max(16, "name must be in 16 characters"),
  country: z.string().min(1, "Select country to continue"),
  cart: z.string(),
});
export const Step2 = () => {
  const router = useRouter();
  const [countryNames, setCountryNames] = useState<string[]>([]);
  const [image, setImage] = useState<string | File>("");
  const [isLoading, setIsLoading] = useState(false);

  const getCountryNames = async () => {
    try {
      const res = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const data = res.data;
      const names = data.map((country: any) => country.name.common);
      setCountryNames(names);
    } catch (error) {
      console.error("Failed to fetch countries", error);
    }
  };

  useEffect(() => {
    getCountryNames();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      lastname: "",
      firstname: "",
      cart: "",
    },
  });

  const createProfil = async (values: z.infer<typeof formSchema>) => {
    console.log(values, "sdfs");
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <img className="size-[150px]" src="/loading.gif" alt="loading" />
          <p className=" text-[24px] font-medium animate-pulse">Loading</p>
        </div>
      ) : (
        <div className="flex items-start flex-col">
          <div className="text-[24px] font-semibold py-5">
            How would you like to be paid?
            <p className="text-[14px] font-normal text-[#71717A]">
              Enter location and payment details
            </p>
          </div>
          <div className="pt-8 flex">
            <Form {...form}>
              <form
                className="flex text-right"
                onSubmit={form.handleSubmit(createProfil)}
              >
                <div className="flex flex-col text-right gap-3 pb-6 w-[510px]">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex items-start flex-col">
                        <FormLabel>Select country</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? countryNames.find(
                                      (country) => country === field.value
                                    )
                                  : "Select country"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search country"
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countryNames.map((country) => (
                                    <CommandItem
                                      value={country}
                                      key={country}
                                      onSelect={() => {
                                        form.setValue("country", country);
                                      }}
                                    >
                                      {country}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          country === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex w-full gap-3">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem className="flex  w-full items-start flex-col">
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input
                              className={` focus-visible:ring-0  ${
                                field.value.length >= 5 &&
                                "focus-visible:border-[#18BA51] border-solid border-2"
                              }`}
                              placeholder="Enter your name here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-start flex-col">
                          <FormLabel>Last name</FormLabel>
                          <FormControl className="flex">
                            <Input
                              className={` focus-visible:ring-0 ${
                                field.value.length >= 6 &&
                                "focus-visible:border-[#18BA51] border-solid border-2"
                              }`}
                              type="text"
                              placeholder="Enter your name here"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="cart"
                    render={({ field }) => (
                      <FormItem className="flex items-start flex-col">
                        <FormLabel>Enter cart number</FormLabel>
                        <FormControl className="flex">
                          <InputOTP placeholder="X" maxLength={16} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                              <InputOTPSlot index={6} />
                              <InputOTPSlot index={7} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={8} />
                              <InputOTPSlot index={9} />
                              <InputOTPSlot index={10} />
                              <InputOTPSlot index={11} />
                              <InputOTPSeparator />
                              <InputOTPSlot index={12} />
                              <InputOTPSlot index={13} />
                              <InputOTPSlot index={14} />
                              <InputOTPSlot index={15} />
                            </InputOTPGroup>
                          </InputOTP>
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
      )}
    </div>
  );
};
