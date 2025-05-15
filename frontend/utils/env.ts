import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.NEXT_PUBLIC_BACKEND_URI;
const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export { port, upload_preset, cloud_name };
