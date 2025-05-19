import { prisma } from "../../../utils/prisma";
import { Request, Response } from "express";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { secret_key } from "../../../utils/env";

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) return res.send({ message: "User not found" });
    const isMatch = compareSync(password, user.password);
    if (!isMatch) return res.send({ message: "Email or Password wrong" });
    const token = jwt.sign(user, secret_key as any, { expiresIn: 36000 });
    res.cookie("token", token, {
      maxAge: 100000,
      signed: false,
      httpOnly: true,
      secure: false,
    });

    return res.send({ message: "success", token: token });
  } catch (error) {
    console.log(error, "this is error");
    return res.status(500).send({ message: error });
  }
};
