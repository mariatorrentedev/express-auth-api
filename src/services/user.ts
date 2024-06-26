import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function deleteUserById(id: number) {
  return prisma.user.delete({ where: { id } });
}

export async function editUser(
  userId: number,
  data: { email: string; password: string }
) {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data,
  });
  return updatedUser;
}
