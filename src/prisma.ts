import * as z from "zod";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createuser = async () => {
  const friendId = "138edfa9-6c76-475c-b8da-6846c31cf4ed"; 

  const user = await prisma.user.findFirst({
    where: { id: "c81a7841-ec6c-4991-8b37-2552762ed179" },
    include: { friendsof: true, friends: true },
  });


  const user2 = await prisma.user.update({where:{id:"138edfa9-6c76-475c-b8da-6846c31cf4ed"},
  data:{friends:{connect:[{id:"de2cd1e6-fdff-4472-82db-a4383bca14cb"}]}}

  });
  console.log(user,
     "#########################################\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",
     user2);
};

export const addFreind = async () => {
  const user = await prisma.user.update({
    where: {
      id: "138edfa9-6c76-475c-b8da-6846c31cf4ed",
    },

    data: { friends: {} },
  });
  console.log(user);
};
