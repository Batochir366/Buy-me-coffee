"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Marker as LeafletMarker, LatLngTuple } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, MapPin, X } from "lucide-react";
import ReactDOMServer from "react-dom/server";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { formSchema, step2formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Step2 } from "./Step2";
import { Step1 } from "./Step1";
import {
  uploadImageToCloudinary,
  uploadToCloudinary,
} from "../utils/imageUpload";

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

const initialData = [
  {
    latLng: [47.9222, 106.95] as LatLngTuple,
    title: "messi",
    icon: customIcon,
  },
  {
    latLng: [47.9223, 106.918] as LatLngTuple,
    title: "ronaldo",
    icon: customIcon2,
  },
];
type CompanyInfoType = z.infer<typeof formSchema> &
  z.infer<typeof step2formSchema>;

export const Map = () => {
  const [clicked, setClicked] = useState<LatLngTuple | null>(null);
  const [address, setAddress] = useState("");
  const [data] = useState(initialData);
  const [value, setValue] = useState<
    Partial<z.infer<typeof formSchema>> &
      Partial<z.infer<typeof step2formSchema>>
  >({});
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<File | undefined>();
  const [profileReview, setProfileReview] = useState<string>("");
  const [imagesReview, setImagesReview] = useState<string[]>([]);
  const [isNext, setIsNext] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType>();
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
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
    setClicked: Dispatch<SetStateAction<LatLngTuple | null>>;
  }) {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const coords: LatLngTuple = [lat, lng];
        setClicked(coords);
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

    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      Facebook: "",
      instagram: "",
      website: "",
      phoneNumber: "",
      companyLogo: [] as unknown as File[],
    },
  });

  const Step2form = useForm<z.infer<typeof step2formSchema>>({
    resolver: zodResolver(step2formSchema),
    defaultValues: {
      images: [] as unknown as File[],
      categories: [],
    },
  });

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedProfile(file);
    setProfileReview(URL.createObjectURL(file));
  };

  const handleProfileToCloud = async (file: File | undefined) => {
    if (!file) return;
    try {
      const url = await uploadImageToCloudinary(file);
      return url;
    } catch (error) {
      console.log("err", error);
      return;
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = [...imagesReview];
    const updatedFiles = [...selectedImages];
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);

    setImagesReview(updatedPreviews);
    setSelectedImages(updatedFiles);
    Step2form.setValue("images", updatedFiles as any);
  };

  const handlNextStep = () => setIsNext(true);
  const handPreStep = () => setIsNext(false);

  const onnext = async (values: z.infer<typeof formSchema>) => {
    const { companyLogo, ...rest } = values;
    const uploadedLogoUrl = await handleProfileToCloud(selectedProfile);
    setValue({ ...rest, companyLogo: uploadedLogoUrl });
    handlNextStep();
  };

  const onSubmit = async (values: z.infer<typeof step2formSchema>) => {
    const imageUrls = await uploadToCloudinary(selectedImages);

    const updatedValues = {
      ...values,
      images: imageUrls,
      address: address,
      location: clicked,
    };

    const finalData: CompanyInfoType = {
      ...(value as z.infer<typeof formSchema>),
      ...updatedValues,
    };

    setValue(finalData);
    setCompanyInfo(finalData);
  };
  console.log(companyInfo, "final");

  return (
    <div className="w-screen h-screen flex">
      <div className="h-full w-[40%] bg-gradient-to-br from-black via-purple-950 to-black">
        <a href={`https://www.google.com/maps/search/${address}`}>
          linkruu osroh
        </a>
      </div>
      <MapContainer
        className=" size-full z-10 "
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
              <div className="flex flex-col size-fit gap-3 items-end ">
                <h1 className=" text-[14px]">{address}</h1>
                <Dialog>
                  <DialogTrigger>
                    <div className="p-[3px] relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        continue
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    className="flex flex-col size-fit min-w-[466px] backdrop-blur-lg bg-[#111827]/30 "
                    onInteractOutside={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <DialogTitle className="text-[24px] text-[#e3e8ffe6]">
                      Complete your profile page
                    </DialogTitle>
                    <>
                      {true ? (
                        <div>
                          <Form {...Step2form}>
                            <form
                              onSubmit={Step2form.handleSubmit(onSubmit)}
                              className="w-full"
                            >
                              <div className=" flex flex-col gap-5">
                                <FormField
                                  control={Step2form.control}
                                  name="images"
                                  render={({ field }) => (
                                    <FormItem className="flex-col flex items-start w-full pb-[20px]">
                                      <FormLabel className="text-[#e3e8ffe6]">
                                        Add detail images 10/
                                        {imagesReview.length}
                                      </FormLabel>
                                      <FormControl>
                                        <div className="flex flex-col items-end justify-end gap-2">
                                          <div className="flex gap-3 size-fit">
                                            {imagesReview.length === 0 ? (
                                              <div className="flex justify-center items-center border-2 border-[#E4E4E7] border-dashed w-[500px] h-[250px] text-[14px] rounded-md">
                                                Add images, limit is 10 🤔
                                              </div>
                                            ) : (
                                              <Carousel className="w-[500px] flex justify-center items-center">
                                                <CarouselPrevious className="absolute z-20" />
                                                <CarouselContent>
                                                  {imagesReview.map(
                                                    (
                                                      el: string,
                                                      index: number
                                                    ) => (
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
                                            className={`flex items-center justify-end gap-40 w-full ${
                                              imagesReview.length === 10 &&
                                              "hidden"
                                            }`}
                                          >
                                            <FormMessage />
                                            <div className="relative">
                                              <Button className="flex px-4 py-2 rounded-md z-10">
                                                Add image
                                              </Button>
                                              <Input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="opacity-0 w-20 h-full absolute top-0 left-0 z-20 cursor-pointer text-[#e3e8ffe6]"
                                                onChange={(e) => {
                                                  const files = Array.from(
                                                    e.target.files || []
                                                  ).slice(0, 10);

                                                  const fileURLs = files.map(
                                                    (file) =>
                                                      URL.createObjectURL(file)
                                                  );
                                                  setImagesReview((prev) => [
                                                    ...prev,
                                                    ...fileURLs,
                                                  ]);
                                                  setSelectedImages((prev) => [
                                                    ...prev,
                                                    ...files,
                                                  ]);
                                                  Step2form.setValue("images", [
                                                    ...selectedImages,
                                                    ...files,
                                                  ]);
                                                  field.onChange([
                                                    ...selectedImages,
                                                    ...files,
                                                  ]);
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <Step2
                                control={Step2form.control}
                                name="categories"
                              />
                            </form>
                          </Form>
                          <div className=" w-[500px] justify-between flex pt-5">
                            <Button onClick={() => handPreStep()} type="button">
                              <ChevronLeft />
                            </Button>
                            <Button
                              className="bg-green-400"
                              onClick={() => Step2form.handleSubmit(onSubmit)()}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(onnext)}
                            className="w-full"
                          >
                            <FormField
                              control={form.control}
                              name="companyLogo"
                              render={({ field }) => (
                                <FormItem className=" flex flex-col items-start w-full pb-[20px]">
                                  <FormLabel className="text-[#e3e8ffe6]">
                                    Company logo
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative flex justify-center items-center size-[160px]">
                                      <div className="flex justify-center items-center border-2 border-[#E4E4E7] border-dashed size-[160px] rounded-full absolute z-20">
                                        <Input
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            field.onChange(e.target.files);
                                            handleProfileImage(e);
                                          }}
                                          className="rounded-full opacity-0 size-[160px]"
                                        />
                                      </div>
                                      <Camera
                                        className={`z-10 text-[#e3e8ffe6]/50 ${
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
                            <Step1 control={form.control} />

                            <div className=" flex pt-5">
                              <Button
                                className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-[#e3e8ffe6] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
                                type="submit"
                              >
                                Submit
                              </Button>
                            </div>
                          </form>
                        </Form>
                      )}
                    </>
                  </DialogContent>
                </Dialog>
              </div>
            </Popup>
          </Marker>
        )}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.jawg.io/5811666f-ea6e-421b-a1a8-c220b61f6b36/{z}/{x}/{y}{r}.png?access-token=uqeYaHBOlPqp13ESsgteE53obi4o78aMNktTHsvSRtv6g2DhywRCEzEIelnC7vhx"
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
