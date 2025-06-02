"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Camera, MapPin, X } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";

const customIcon = L.icon({
  iconUrl:
    "https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-reacts-as-he-looks-on-during-news-photo-1725633476.jpg?crop=0.666xw:1.00xh;0.180xw,0&resize=640:*",
  iconSize: [60, 60],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: " rounded-full",
});
const customIcon2 = L.icon({
  iconUrl:
    "https://imageio.forbes.com/specials-images/imageserve/663e595b4509f97fdafb95f5/0x0.jpg?format=jpg&crop=383,383,x1045,y23,safe&height=416&width=416&fit=bounds",
  iconSize: [60, 60],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: " rounded-full",
});
const MarkerIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: ReactDOMServer.renderToString(
    <MapPin className=" hidden text-red-400" />
  ),
});
const MarkerPin = new L.DivIcon({
  className: "custom-div-icon",
  html: ReactDOMServer.renderToString(<MapPin className=" text-blue-700" />),
});
const initialData = [
  {
    latLng: [47.9222, 106.95],
    title: "messi",
    icon: customIcon,
  },
  {
    latLng: [47.9223, 106.918],
    title: "ronaldo",
    icon: customIcon2,
  },
];
export const Map = () => {
  const [clicked, setClicked] = useState<number[]>([0, 0]);
  const [address, setAddress] = useState("");
  const [data, setData] = useState(initialData);
  const [review, setReview] = useState<string[]>([]);
  const [image, setImage] = useState<string[] | File>([]);
  const [profile, setProfile] = useState<string | File>();
  const [profileReview, setProfileReview] = useState<string>("");
  console.log(address, "address");

  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef!.current) {
      markerRef!.current!.openPopup();
    }
  }, [clicked]);

  const ChangeZoomControlPosition = () => {
    const map = useMap();
    useEffect(() => {
      map.zoomControl.setPosition("bottomright");
    }, [map]);
    return null;
  };

  function ClickHandler({
    setClicked,
  }: {
    setClicked: Dispatch<SetStateAction<number[]>>;
  }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClicked([lat, lng]);
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        )
          .then((res) => res.json())
          .then((data) => {
            setAddress(data.display_name);
          })
          .catch((err) => console.error("Geocoding error:", err));
      },
    });
    // console.log(address);
    // console.log(clicked);

    return null;
  }
  const formSchema = z.object({
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
    images: z
      .any()
      .refine(
        (files) =>
          review.length == 0 && files instanceof FileList && files.length > 0,
        {
          message: "At least one image is required.",
        }
      )
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type)
          ),
        {
          message: "Only JPG, PNG, or WEBP files are allowed.",
        }
      ),
    companyLogo: z
      .any()
      .refine((file) => {
        // Validate file is present
        return file instanceof FileList && file.length > 0;
      }, "Company logo is required")
      .refine((file) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        return file instanceof FileList && allowedTypes.includes(file[0]?.type);
      }, "Only JPG, PNG, or WEBP files are allowed")
      .refine((file) => {
        const maxSize = 2 * 1024 * 1024; // 2MB
        return file instanceof FileList && file[0]?.size <= maxSize;
      }, "Image must be smaller than 2MB"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      phoneNumber: "",
      Facebook: "",
      instagram: "",
      website: "",
      images: "",
      companyLogo: "",
    },
    mode: "onChange",
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const HandleImage = (e) => {
    console.log(e.target.files, "targets");
    if (e.target.files) {
      setImage([...image, ...e.target.files]);
      const filesArray = Array.from(e.target.files);
      filesArray.map((el) => review.push(URL.createObjectURL(el)));
      console.log(review, "re");
    } else {
      setReview([]);
    }
  };

  const handleProfileImage = (e) => {
    if (e.target.files) {
      setProfile(e.target.files[0]);
      setProfileReview(URL.createObjectURL(e.target.files[0]));
      console.log(review, "re");
    } else {
      setProfileReview("");
    }
  };

  const removeImage = (indexToRemove: number) => {
    setReview((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="w-screen h-screen flex">
      <div className="h-full w-[40%] bg-green-500">
        <a href={`https://www.google.com/maps/search/${address}`}>
          linkruu osroh
        </a>
      </div>
      <MapContainer
        className=" size-full z-10"
        center={[47.92, 106.91]}
        zoom={14}
        attributionControl={false}
      >
        <ClickHandler setClicked={setClicked} />
        <ChangeZoomControlPosition />
        {clicked && (
          <Marker icon={MarkerIcon} ref={markerRef} position={clicked}>
            <Popup>
              <p className="text-black font-bold text-[18px] flex pb-2 h-0">
                Are you sure 🤔
              </p>
              <div className="flex flex-col size-fit gap-3 items-end">
                <h1 className=" text-[14px]">{address}</h1>
                <Dialog>
                  <DialogTrigger className="bg-red-400 text-white font-medium rounded-full flex size-fit px-4  py-2">
                    continue
                  </DialogTrigger>
                  <DialogContent className="flex flex-col size-fit min-w-[466px]">
                    <DialogTitle className="text-[24px]">
                      Complete your profile page
                    </DialogTitle>
                    {/* <MapContainer
                      className=" h-[280px] w-[308px] z-10"
                      center={clicked}
                      zoom={18}
                      dragging={false}
                      zoomControl={false}
                      scrollWheelZoom={false}
                      doubleClickZoom={false}
                      boxZoom={false}
                      keyboard={false}
                      touchZoom={false}
                      attributionControl={false}
                    >
                      <Marker
                        icon={MarkerPin}
                        ref={markerRef}
                        position={clicked}
                      ></Marker>
                      <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                    </MapContainer> */}
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full"
                      >
                        <div className=" flex-col flex gap-2">
                          <FormField
                            control={form.control}
                            name="companyLogo"
                            render={({ field }) => (
                              <FormItem className="flex-col flex items-start w-full">
                                <FormLabel>Company logo</FormLabel>
                                <FormControl>
                                  <div className="relative flex justify-center items-center size-[160px]">
                                    <div className="flex justify-center items-center border-2 border-[#E4E4E7] border-dashed size-[160px] rounded-full absolute z-20">
                                      <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                          field.onChange(e.target.files); // send to react-hook-form
                                          handleProfileImage(e); // your preview logic
                                        }}
                                        className="rounded-full opacity-0 size-[160px]"
                                      />
                                    </div>
                                    <Camera
                                      className={`z-10 text-[#18181B]/50 ${
                                        profileReview && "hidden"
                                      }`}
                                    />
                                    {profileReview && (
                                      <Image
                                        className="size-[160px] absolute z-10 rounded-full"
                                        src={profileReview}
                                        alt="preview"
                                        width={160}
                                        height={160}
                                      />
                                    )}
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                              <FormItem className="flex-col flex items-start w-full">
                                <FormLabel>Add detail images</FormLabel>
                                <FormControl>
                                  <div className="flex flex-col items-end justify-end gap-2">
                                    {/* Image Preview / Carousel */}
                                    <div className="flex gap-3 size-fit">
                                      {review.length === 0 ? (
                                        <div className="flex justify-center items-center border-2 border-[#E4E4E7] border-dashed w-[500px] h-[250px] text-[14px] rounded-md">
                                          Add images, limit is 10 🤔
                                        </div>
                                      ) : (
                                        <Carousel className="w-[500px] flex justify-center items-center">
                                          <CarouselPrevious className="absolute z-20" />
                                          <CarouselContent>
                                            {review.map(
                                              (el: string, index: number) => (
                                                <CarouselItem
                                                  key={index}
                                                  className="w-fit flex flex-col items-end gap-2"
                                                >
                                                  <Image
                                                    className="w-[500px] h-[250px] rounded-md"
                                                    src={el}
                                                    alt={`preview-${index}`}
                                                    width={430}
                                                    height={250}
                                                  />
                                                  <X
                                                    onClick={() =>
                                                      removeImage(index)
                                                    }
                                                    className="text-red-500 absolute cursor-pointer"
                                                  />
                                                </CarouselItem>
                                              )
                                            )}
                                          </CarouselContent>
                                          <CarouselNext className="absolute z-20" />
                                        </Carousel>
                                      )}
                                    </div>
                                    <div
                                      className={`flex justify-center items-center size-fit relative ${
                                        review.length == 10 && "hidden"
                                      }`}
                                    >
                                      <Button className="flex px-4 py-2 rounded-md z-10">
                                        Add image
                                      </Button>
                                      <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="opacity-0 w-20 h-full absolute top-0 left-0 z-20 cursor-pointer"
                                        onChange={(e) => {
                                          field.onChange(e.target.files);
                                          HandleImage(e);
                                        }}
                                      />
                                    </div>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className=" flex flex-col w-full gap-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="flex-col flex items-start w-full">
                                <FormLabel>Company name</FormLabel>
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
                            name="description"
                            render={({ field }) => (
                              <FormItem className="w-full flex flex-col items-start">
                                <FormLabel>description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    className={` focus-visible:ring-0 pb-15 pt-4 text-wrap ${
                                      field.value.length >= 5 &&
                                      "focus-visible:border-[#18BA51] border-solid border-2"
                                    }`}
                                    placeholder="Write more about location here"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className=" flex gap-2">
                            <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-start">
                                  <FormLabel>Phone number</FormLabel>
                                  <FormControl>
                                    <Input
                                      className={` focus-visible:ring-0 ${
                                        field.value.length >= 8 &&
                                        "focus-visible:border-[#18BA51] border-solid border-2"
                                      } `}
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
                              name="website"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-start">
                                  <FormLabel>Social media URL</FormLabel>

                                  <FormControl>
                                    <Input
                                      className={` focus-visible:ring-0 ${
                                        field.value.length >= 6 &&
                                        "focus-visible:border-[#18BA51] border-solid border-2"
                                      } `}
                                      type="text"
                                      placeholder="https://"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex gap-2">
                            <FormField
                              control={form.control}
                              name="instagram"
                              render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-start">
                                  <FormLabel>Instagram</FormLabel>

                                  <FormControl>
                                    <Input
                                      className={` focus-visible:ring-0 ${
                                        field.value.length >= 6 &&
                                        "focus-visible:border-[#18BA51] border-solid border-2"
                                      } `}
                                      type="text"
                                      placeholder="https://"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="Facebook"
                              render={({ field }) => (
                                <FormItem className="flex-col flex items-start w-full">
                                  <FormLabel>Facebook</FormLabel>

                                  <FormControl>
                                    <Input
                                      className={` focus-visible:ring-0 ${
                                        field.value.length >= 6 &&
                                        "focus-visible:border-[#18BA51] border-solid border-2"
                                      } `}
                                      type="text"
                                      placeholder="https://"
                                      {...field}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <Button className="w-full" type="submit">
                          Submit
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </Popup>
          </Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((el, index) => {
          return (
            <Marker key={index} icon={el.icon} position={el.latLng}>
              <Popup>{el.title}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
