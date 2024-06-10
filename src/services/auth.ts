import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { SECRET_KEY } from "../config";

const prisma = new PrismaClient();

export async function signup(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { email, password: hashedPassword } });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("No User Found: invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
}
