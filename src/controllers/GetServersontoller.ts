import { PrismaClient, server } from "@prisma/client";
import { Request, Response } from "express";

const GetServersontoller = async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  let serversBelongsTo:any = null;
  const {
    userId,
    serverId,
    chatLimit,
    operationType,
  }: {
    userId: string;
    chatLimit: number;
    serverId: string;
    operationType: "findGeneral" | "findSpecific";
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
  }
console.log(    userId,
  serverId,
  chatLimit,
  operationType,)
  try {
    if (operationType === "findGeneral") {
console.log("general")
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

console.log(serversBelongsTo)
    res
      .status(202)
      .json({ message: `created successfully ☑️ `, serversBelongsTo });
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: ` was not created because it already exists ❌ ` });
  }
};

module.exports = GetServersontoller;
