import { configDotenv } from "dotenv";

configDotenv();

const port = process.env.NEXT_PUBLIC_BACKEND_URI;

export { port };
