import { string, z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(5, {
      message: "must be at least 5 characters.",
    })
    .max(200, { message: "too long" }),
  phoneNumber: z.string({ required_error: "phone number required" }).min(8, {
    message: "at least 8 characters.",
  }),
  Facebook: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  instagram: z.string().min(2, {
    message: "must be at least 2 characters.",
  }),
  website: z
    .string({ required_error: "url required" })
    .url({ message: "enter valid URL" }),
  companyLogo: z
    .any()
    .refine((file) => {
      return file instanceof FileList && file.length > 0;
    }, "Company logo is required")
    .refine((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      return file instanceof FileList && allowedTypes.includes(file[0]?.type);
    }, "Only JPG, PNG, or WEBP files are allowed")
    .refine((file) => {
      const maxSize = 2 * 1024 * 1024;
      return file instanceof FileList && file[0]?.size <= maxSize;
    }, "Image must be smaller than 2MB"),
});

export const step2formSchema = z.object({
  images: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Please upload at least one image.",
    })
    .refine(
      (files) =>
        files &&
        typeof files === "object" &&
        "length" in files &&
        Array.from(files).every(
          (file) =>
            file instanceof File &&
            ["image/jpeg", "image/png", "image/webp"].includes(file.type)
        ),
      {
        message: "Only JPG, PNG, or WEBP files are allowed.",
      }
    )
    .refine((files) => files?.length <= 10, {
      message: "You can upload a maximum of 10 images.",
    }),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
});
