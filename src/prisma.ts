import * as z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createuser = async () => {


  const users = await prisma.user.findMany({where:{AND:[{},{}]}})
  return users
};

