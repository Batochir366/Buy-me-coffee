import { prisma } from "../../../utils/prisma";
import { Request, Response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../../../utils/env";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) return res.send({ message: "User not found" });
    const isMatch = compareSync(password, user.password);
    if (!isMatch) return res.send({ message: "Email or Password wrong" });

    const token = jwt.sign(user, secret_key as any, { expiresIn: 3600 });
    return res.cookie("token", token, {
      maxAge: 60 * 1000 * 10,
      secure: false,
    });
  } catch (error) {
    return res.send({ message: error });
  }
};
