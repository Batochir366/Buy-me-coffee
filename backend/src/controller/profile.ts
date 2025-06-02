import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import jwt from "jsonwebtoken";
import { secret_key } from "../../utils/env";

export const createProfile = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decode = jwt.verify(token, secret_key as string);
  const decodedUserId = await Object.values(decode)[0];
  const {
    name,
    about,
    avatarImage,
    socialMediaURL,
    backgroundImage,
    successMessage,
  } = req.body;
  try {
    const response = await prisma.profile.create({
      data: {
        name,
        about,
        avatarImage,
        socialMediaURL,
        backgroundImage,
        successMessage,
        userId: decodedUserId,
      },
    });
    return res.status(200).send({ success: true, message: response });
  } catch (error) {
    return res.send({ message: error });
  }
};

export const getProfile = async (req: any, res: any) => {
  const id = req.params;
  try {
    const response = await prisma.user.findUnique({ where: id });
    return res.send({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).send({ success: false });
  }
};
