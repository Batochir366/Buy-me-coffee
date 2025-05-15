import axios from "axios";
import { cloud_name, upload_preset } from "./env";

export const uploadImage = async (file: File) => {
  if (!file) {
    return null;
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    const result = res.data.secure_url;
    return result;
  } catch (error) {
    console.log(error);
    return { error: "failed to upload image" };
  }
};
