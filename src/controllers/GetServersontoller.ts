import { Request, Response } from "express";
import { prisma } from "../prisma";

const GetServersontoller = async (req: Request, res: Response) => {

  const {
    userId,
    serverId,
    chatLimit,
    operationType,
    invitationLink,
    channelId,
  }: {
    userId: string;
    chatLimit: number;
    serverId: string;
    operationType:
      | "findGeneral"
      | "findSpecific"
      | "findInvitation"
      | "findChannel";
    invitationLink: string;
    channelId:string;
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
  }
     
  try {

    if (operationType === "findGeneral") {
    const  serversBelongsTo = await prisma.server.findMany({
        where: { members: { some: { memberId: userId } } },
        include: { members: true, channels: true },
      });
      res
      .status(202)
      .json({ message: `found server(s) successfully ☑️ `, serversBelongsTo });

    }
    
    else if (operationType === "findSpecific") {

    const  serversBelongsTo = await prisma.server.findFirst({
        where: { id: serverId, members: { some: { memberId: userId } } },
        include: {
          members: { include: { member: true } },
          channels: {
            include: {
              creator: true,
              chat: {
                orderBy: { createdAt: "desc" },
                take: chatLimit || 5,
                include: {
                  creator: { include: { member: true } },
                  content: {
                    include: {
                      file: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      res
        .status(202)
        .json({
          message: `found server(s) successfully ☑️ `,
          serversBelongsTo,
        });
    }
    
    else if (operationType === "findChannel") {
    const  serversBelongsTo = await prisma.channel.findFirst({
        where: { id: channelId },
        include: {
          chat: {
            orderBy: { createdAt: "desc" },
            take: chatLimit || 9,
            include: {
              creator: { include: { member: true } },
              content: { include: { file: true } },
            },
          },
        },
      });
      res
        .status(202)
        .json({
          message: `found server(s) successfully ☑️ `,
          serversBelongsTo,
        });
        res
        .status(202)
        .json({ message: `found server(s) successfully ☑️ `, serversBelongsTo });
    } 
    
    else if (operationType === "findInvitation") {
    const  serversBelongsTo = await prisma.server.findFirst({
        where: { invitationLink },
      });
      res
      .status(202)
      .json({ message: `found server(s) successfully ☑️ `, serversBelongsTo });

    }


  } catch (error) {

    res
      .status(409)
      .json({ message: ` Error Happend when fetching servers ❌ ` });  
  
  }
};

module.exports = GetServersontoller;
