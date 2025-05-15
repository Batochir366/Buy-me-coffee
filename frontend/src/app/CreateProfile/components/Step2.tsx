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
import { Check, ChevronsUpDown } from "lucide-react";

import axios from "axios";
import { port } from "../../../../utils/env";
import { useRouter } from "next/navigation";
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
import { isValidLuhn } from "@/components/LuhnAlgorithm";

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, "Please enter name")
    .min(2, "name must be 2 characters")
    .max(16, "name must be in 16 characters"),
  lastName: z
    .string()
    .min(1, "Please enter name")
    .min(2, "name must be 2 characters")
    .max(16, "name must be in 16 characters"),
  country: z.string().min(1, "Select country to continue"),
  cardNumber: z
    .string()
    .max(16, "Invalid card number")
    .min(16, "Invalid card number")
    .refine(isValidLuhn, { message: "invalid cart number" }),
  expiryDate: z.string().min(1, "Invalid month"),
  cvc: z.string().min(3, "Invalid month").max(3, "Invalid month"),
});
export const Step2 = () => {
  const router = useRouter();
  const [countryNames, setCountryNames] = useState<string[]>([]);
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
      lastName: "",
      firstName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const createProfile = async (values: z.infer<typeof formSchema>) => {
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
                onSubmit={form.handleSubmit(createProfile)}
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
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex  w-full items-start flex-col">
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input
                              className={` focus-visible:ring-0  ${
                                field.value.length >= 2 &&
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-start flex-col">
                          <FormLabel>Last name</FormLabel>
                          <FormControl className="flex">
                            <Input
                              className={` focus-visible:ring-0 ${
                                field.value.length >= 2 &&
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
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem className="flex w-full items-start flex-col">
                        <FormLabel>Enter card number</FormLabel>
                        <FormControl className="flex">
                          <Input
                            maxLength={16}
                            className={` focus-visible:ring-0 ${
                              field.value.length >= 16 &&
                              "focus-visible:border-[#18BA51] border-solid border-2 "
                            }`}
                            type="text"
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex gap-3">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-start flex-col">
                          <FormLabel>expiryDate</FormLabel>
                          <FormControl className="flex">
                            <Input
                              className={` focus-visible:ring-0 ${
                                field.value.length >= 6 &&
                                "focus-visible:border-[#18BA51] border-solid border-2"
                              }`}
                              type="month"
                              placeholder="month / year"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem className="flex w-full items-start flex-col">
                          <FormLabel>CVC</FormLabel>
                          <FormControl className="flex">
                            <Input
                              maxLength={3}
                              className={` focus-visible:ring-0 ${
                                field.value.length >= 3 &&
                                "focus-visible:border-[#18BA51] border-solid border-2"
                              }`}
                              type="text"
                              placeholder="CVC"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
