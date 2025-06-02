import { prisma } from "../../../utils/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Prisma } from "../../../generated/prisma";
import jwt from "jsonwebtoken";
import { secret_key } from "../../../utils/env";

export type UserWhereUniqueInput = {
  name: string;
};

export const checkUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { name: username },
    });
    if (user) {
      return res.status(409).send({ message: "Username already exists" });
    }
    return res.status(200).send({ message: "Username is available" });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ message: "Server error" });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 5);
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) {
      return res.status(200).send({ message: "User already exists" });
    }
    const Response = await prisma.user.create({
      data: {
        name,
        password: hashedPass,
        email,
      },
    });

    const token = jwt.sign(Response, secret_key as any, { expiresIn: 360000 });
    res.cookie("token", token, {
      maxAge: 1000000,
      signed: false,
      httpOnly: true,
      secure: false,
    });

    return res.send({ message: "success", token: token });
  } catch (error) {
    return res.send({ message: error });
  }
};
