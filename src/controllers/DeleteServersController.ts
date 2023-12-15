
import { Request, Response } from "express";
import { prisma } from "../prisma";

const GetServersontoller = async (req: Request, res: Response) => {
  const { userId, isAdmin, serverId } = req.body;


 

  if (!userId) {
    return res.status(404).json({ message: "No valid data passed " });
  }

  try {
    if (isAdmin) {
      await prisma.server.delete({
        where: {
          id: serverId,
          members: { some: { memberId: userId, userType: "admin" } },
        },
      });
      res
      .status(200)
      .json({ message: `Server Deleted Successfully ✅` });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: `Error occurred in deleting operation ❌` });
  }
};

module.exports = GetServersontoller;
