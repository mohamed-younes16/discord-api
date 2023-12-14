import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const loginuser = async (req: Request, res: Response) => {
  const { state, userId }: any = req.query;
  const prisma = new PrismaClient();
  console.log( { state, userId })
  const UserUpdate = await prisma.user.update({
    where: { id: userId },
    data: { active: state == "online" ? true : false },
  });


  if (!state) {
    return res
      .status(404)
      .json({ message: "user not found or no valid data passed " });
  }

  // if (!rightpass) return res.status(401).json({ message: "wrong password" });
  if (state) {
    res.json({ user: "ff" });
  }
};

module.exports = loginuser;
