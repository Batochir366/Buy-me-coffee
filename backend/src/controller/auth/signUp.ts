import { prisma } from "../../../utils/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Prisma } from "../../../generated/prisma";

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
      return res.status(200).send({ message: "Username already exists" });
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
