import { Request, Response } from "express";
import { prisma } from "../prisma";

const PostServersontoller = async (req: Request, res: Response) => {
  const {
    userId,
    serverData,
    operationType,
    serverId,
    name,
    type
  }: {
    serverData: { imageUrl: string; name: string };
    userId: string;
    serverId: string;
    name: string;
    type: "text" | "video" | "audio";
    operationType: "createChannel" | "createServer";
  } = req.body;
console.log(req.body)
  if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
  }

  try {
    if (operationType === "createServer") {
      const serverinitialization = await prisma.server.create({
        data: {
          ...serverData,
          members: {
            create: { memberId: userId, userType: "admin" },
          },
          channels: {
            create: { name: "general", type: "text", creatorId: userId },
          },
        },
        include: { channels: true, members: { include: { member: true } } },
      });

      res.status(202).json({
        message: `${serverData.name} created successfully ☑️ `,
        serverinitialization,
      });

    } else if (operationType === "createChannel") {

      const channelinitialization = await prisma.server.update({
        where: { id: serverId },
        data:{channels:{create:{creatorId:userId,name,type,}}}
      });

      res.status(202).json({
        message: `${channelinitialization.name} created successfully ☑️ `,

      });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: `\"${serverData.name}\" was not created because it already exists ❌ `,
    });
  }
};

module.exports = PostServersontoller;
