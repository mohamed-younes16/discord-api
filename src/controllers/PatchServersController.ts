
import { prisma } from "./../prisma";
import { Request, Response } from "express";

const PatchServersController = async (req: Request, res: Response) => {
  const {
    userId,
    serverId,
    operationType,
    invitationLink,
    serverData,
    memberId
  }: {
    userId: string;
    serverId: string;
    operationType:
      | "addingMember"
      | "addingChat"
      | "editingServer"
      | "leaveMember";
    invitationLink: string;
    serverData: {
      imageUrl: string;
      name: string;
    };
    memberId:string
  } = req.body;

  let ServerUpdate: any;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    if (operationType === "addingMember") {
      try {
        ServerUpdate = await prisma.server.update({
          where: { invitationLink },
          data: {
            members: { create: { memberId: userId, userType: "member" } },
          },
        });

        res.status(201).json({
          message: `You Joined The Server Server ✅`,
          serversBelongsTo: ServerUpdate,
        });
      } catch (error) {
        console.log(error);
        res.status(409).json({ message: `You are already in the server ❌` });
      }
    } else if (operationType === "editingServer") {
      ServerUpdate = await prisma.server.update({
        where: { id: serverId },
        data: { ...serverData },
      });

      res.status(201).json({ message: `Server Edited Successfully ✅` });
    }
    
    else if (operationType === "leaveMember") {
      ServerUpdate = await prisma.server.update({
        where: { id: serverId },
        data: { members:{delete:{id:memberId,userType:{not:"admin"}}} },
      });

      res.status(201).json({ message: `Server Edited Successfully ✅` });
    }
    else {
      res.status(400).json({ message: "Invalid operation type" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: `Error occurred in the update operation ❌` });
  }
};

module.exports = PatchServersController;
