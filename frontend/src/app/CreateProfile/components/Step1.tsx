"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { uploadImage } from "../../../../utils/Image";
import Image from "next/image";
import { Camera, CircleX } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { port } from "../../../../utils/env";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter name")
    .min(2, "name must be 2 characters")
    .max(16, "name must be in 16 characters"),
  about: z
    .string()
    .min(1, "Please enter info about yourself")
    .min(5, "too short")
    .max(160, "too long"),
  social: z.string().min(1, "Please enter name").url("please enter valid url"),
});
export const Step1 = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [review, setReview] = useState<string>();
  const [image, setImage] = useState<string | File>("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(image, "sd");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      about: "",
      social: "",
    },
  });
  const createProfile = async (values: z.infer<typeof formSchema>) => {
    try {
      if (image == "") {
        setError(true);
      } else {
        setError(false);
        setIsLoading(true);
        const imageURL = await uploadImage(image as File);
        // const response = axios.post(`${port}`, {
        //   ...values,
        //   avatarImage: imageURL,
        // });
        setStep(false);
        console.log(imageURL, "url");
      }
    } catch (error) {
      console.log(error, "err");
    }
  };
  const checkImageInput = () => {
    if (!image) setError(true);
    if (image) setError(false);
  };

  const HandleImage = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setReview(URL.createObjectURL(e.target.files[0]));
    } else {
      setReview("/");
    }
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
            Complete your profile page
          </div>
          <h1 className="text-[14px] font-medium pb-3">Add photo</h1>
          <div className="relative flex justify-center items-center size-[160px]">
            <div className=" flex justify-center items-center border-2 border-[#E4E4E7] border-dashed size-[160px] rounded-full absolute z-20">
              <Input
                onChange={HandleImage}
                type="file"
                className="rounded-full opacity-0 size-[160px]"
                placeholder="Enter email here"
              />
            </div>
            <Camera
              className={`z-10 text-[#18181B]/50 ${review && "hidden"}`}
            />
            {review && (
              <Image
                className="size-[160px] absolute z-10 rounded-full"
                src={review}
                alt="preview"
                width={160}
                height={160}
              />
            )}
          </div>
          {error && (
            <div className="flex justify-center text-[#EF4444] items-center gap-2 text-nowrap">
              <CircleX className="size-[14px] text-red-400 stroke-1" />
              Please enter image
            </div>
          )}
          <div className="pt-8 flex">
            <Form {...form}>
              <form
                className="flex text-right"
                onSubmit={form.handleSubmit(createProfile)}
              >
                <div className="flex flex-col text-right gap-3 pb-6 w-[510px]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex items-start flex-col">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
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
                  <FormField
                    control={form.control}
                    name="about"
                    render={({ field }) => (
                      <FormItem className="flex items-start flex-col">
                        <FormLabel>About</FormLabel>
                        <FormControl>
                          <Textarea
                            className={` focus-visible:ring-0 pb-15 pt-4 text-wrap ${
                              field.value.length >= 5 &&
                              "focus-visible:border-[#18BA51] border-solid border-2"
                            }`}
                            placeholder="Write about yourself here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="social"
                    render={({ field }) => (
                      <FormItem className="flex items-start text-start flex-col">
                        <FormLabel>Social media URL</FormLabel>
                        <FormControl className="flex text-start">
                          <Input
                            className={` focus-visible:ring-0 ${
                              field.value.length >= 6 &&
                              "focus-visible:border-[#18BA51] border-solid border-2"
                            }`}
                            type="text"
                            placeholder="https://"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button onClick={checkImageInput} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
