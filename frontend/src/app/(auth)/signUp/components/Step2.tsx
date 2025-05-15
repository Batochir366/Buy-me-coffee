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
import { CircleX, Eye, EyeClosed } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email, example@gmail.com"),
  password: z.string().min(8, "password must be atleast 8 characters"),
});

export const Step2 = () => {
  const { userName } = useContext(AuthContext);
  const [isShow, setIsShow] = useState(false);
  const [reqError, setReqError] = useState("");
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
        name: userName,
      });
      if (response.data.message == "User already exists") {
        setReqError(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error, "err");
    }
  };
  const handlerInput = () => {
    setReqError("");
  };

  return (
    <div>
      <div className="text-[24px] font-semibold p-6">
        Welcome,{userName}
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
                  <FormControl onChangeCapture={handlerInput}>
                    <Input placeholder="Enter email here" {...field} />
                  </FormControl>
                  {reqError && (
                    <div className="flex justify-center items-center gap-2">
                      <CircleX className="size-[14px] text-red-400 stroke-1" />
                      <p className="text-[14px] text-red-400">{reqError}</p>
                    </div>
                  )}
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
