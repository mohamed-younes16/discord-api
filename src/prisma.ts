// import * as z from "zod";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export const createuser = async (data: User) => {
  try {
    const users = await prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
    return users;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
export const getUser = async (id: string) => {

  try {
    const users = await prisma.user.findUnique({ where: { id } });

    return users;
    
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
