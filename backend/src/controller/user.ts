import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
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
    return res.send(error);
  }
};

export const getUser = async (req: any, res: any) => {
  try {
    const response = await prisma.user.findMany();
    return res.send({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).send({ success: false });
  }
};

export const updataUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id, "id");

  const { email, name, password } = req.body;
  try {
    const response = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, password, name },
    });
    return res.send({
      success: true,
      data: response,
    });
  } catch (error) {
    return res.send({ message: error });
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return res.send({
      success: true,
      message: "user deleted",
    });
  } catch (error) {
    return res.send({ message: error });
  }
};
