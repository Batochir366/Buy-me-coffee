import { configDotenv } from "dotenv";

configDotenv();

const secret_key = process.env.SECRET_KEY;

export { secret_key };
