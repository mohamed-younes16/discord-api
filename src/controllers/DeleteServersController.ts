import { Request, Response } from "express";
import { prisma } from "../prisma";

const GetServersontoller = async (req: Request, res: Response) => {
  const {
    userId,
    isAdmin,
    serverId,
    operationType,
    channelId,
    memberId
  }: {
    userId: string;
    serverId: string;
    operationType:
    "deleteServer"
    |"deleteChannel"
    |"deleteMember";
    isAdmin:boolean;
    channelId: string;
    memberId:string
  } = req.body;

  if (!userId) {
    return res.status(404).json({ message: "No valid data passed " });
  }

  try {
    if (isAdmin) {
      if (operationType === "deleteServer") {
          const del=   await prisma.server.delete({
        where: {
          id: serverId,
          members: { some: { memberId: userId, userType: "admin" } },
        },
      });
console.log(del)
      res.status(200).json({ message: `Server Deleted Successfully ✅` });
      }
      else if (operationType ==="deleteChannel") {
        const del=   await prisma.channel.delete({
          where: {
            id: channelId,
            creator:{ id:userId,},
          },
        });

        res.status(200).json({ message: `Channel Deleted Successfully ✅` });
      }
      else if (operationType ==="deleteMember") {
console.log({    userId,
  isAdmin,
  serverId,
  operationType,
  channelId,
  memberId})
        const del=   await prisma.server.update({
          where: { id: serverId,members:{some:{memberId:userId,userType:"admin"}} },
          data:{members: {delete:{id:memberId}}}
        });

        res.status(200).json({ message: `Channel Deleted Successfully ✅` });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: `Error occurred in deleting operation ❌` });
  }
};

module.exports = GetServersontoller;
