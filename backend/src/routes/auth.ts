import express from "express";
import { signIn } from "../controller/auth/signIn";

export const authRouter = express.Router();

authRouter.post("/", signIn as any);
