import { prisma } from "../../../utils/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

export const checkUser = async (res: Response, req: Request) => {
  const { name } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { name: name } });
    if (user) {
      return res.send({ message: "username already taken" });
    }
  } catch (error) {
    return res.send({ message: error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 5);
  try {
    const Response = await prisma.user.create({
      data: {
        name,
        password: hashedPass,
        email,
      },
    });
    console.log(res);
    return res.send({
      data: Response,
    });
  } catch (error) {
    return res.send({ message: error });
  }
};
