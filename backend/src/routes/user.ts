import express from "express";
import {
  createUser,
  deleteUserById,
  getUser,
  updataUserById,
} from "../controller/user";

export const userRouter = express.Router();

userRouter
  .post("/", createUser as any)
  .get("/", getUser as any)
  .put("/:id", updataUserById as any)
  .delete("/:id", deleteUserById as any);
