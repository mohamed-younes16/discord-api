import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const GetServersontoller = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  let serversBelongsTo:any = null;
  const {
    userId,
    serverId,
    chatLimit,
    operationType,
    invitationLink
  }: {
    userId: string;
    chatLimit: number;
    serverId: string;
    operationType: "findGeneral" | "findSpecific"|"findInvitation";
    invitationLink:string
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
  }

  try {
    if (operationType === "findGeneral") {

      serversBelongsTo = await prisma.server.findMany({
        where: { members: { some: { memberId: userId } } },
        include: { members: true, channels: true },
      });
    } else if (operationType === "findSpecific") {
      serversBelongsTo = await prisma.server.findFirst({
        where: { id: serverId, members: { some: { memberId: userId } } },
        include: {
          members: { include: { member: true } },
          channels: {
            include: {
              creator: true,
              chat: {
                orderBy: { createdAt: "desc" },
                take: chatLimit || 10,
                include: {
                  content: {
                    include: {
                      file: true,
                      chat: { include: { content: true } },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
    else if (operationType === "findInvitation") {
      serversBelongsTo = await prisma.server.findFirst({where:{ invitationLink, }},)
      
      };
    


    res
      .status(202)
      .json({ message: `found server(s) successfully ☑️ `, serversBelongsTo });
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: ` Error Happend when fetching servers ❌ ` });
  }
};

module.exports = GetServersontoller;
