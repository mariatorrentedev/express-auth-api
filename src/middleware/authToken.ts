import type { Request, Response, NextFunction } from "express";
import type { User } from "../types/user";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { SECRET_KEY } from "../config";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: User;
}

export const authenticateToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
