import express from "express";
import { createProfile, getProfile } from "../controller/profile";
import { TokenCheck } from "../controller/auth/middleware";

export const profileRouter = express.Router();

profileRouter
  .post("/", TokenCheck, createProfile as any)
  .get("/view", TokenCheck, getProfile);
 