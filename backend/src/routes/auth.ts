import express from "express";
import { signIn } from "../controller/auth/signIn";
import { checkUser, signUp } from "../controller/auth/signUp";

export const authRouter = express.Router();

authRouter
  .post("/", signIn as any)
  .post("/signUp", signUp as any)
  .post("/check", checkUser as any);
