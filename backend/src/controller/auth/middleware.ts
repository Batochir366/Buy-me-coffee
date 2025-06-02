import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret_key } from "../../../utils/env";

export const TokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("Token not provided");
  } else {
    try {
      jwt.verify(token, secret_key!);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};
