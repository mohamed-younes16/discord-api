// import * as z from "zod";
import { PrismaClient, User } from "@prisma/client";
export const prisma = new PrismaClient();

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
    const users = await prisma.user.findUnique({
      where: { id },
      include: { freindsRequestedFrom: {take:10} , freindsWith: {take:10} ,freindsOf:{take:10} },
    });

    return users;
  } catch (error: any) {
    console.log(error);
    return false;
  }
};
