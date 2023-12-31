
import { Request, Response } from "express";
import { prisma } from "../prisma";

const loginuser = async (req: Request, res: Response) => {
  const { state, userId }: any = req.query;


await prisma.user.update({
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
