import { Request, Response } from "express";
import { prisma } from "../prisma";
var _ = require("lodash");

const getUsersController = async (req: Request, res: Response) => {
  const { userId, username, operationType, friendId ,chatLimit}: any = req.query;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    if (operationType === "findUser") {
      const debouncedSearch = _.debounce(async () => {
        const users = await prisma.user.findMany({
          where: {
            username: { contains: username },
            id: { not: userId },
            freindsOf: { none: { id: userId } },
            freindsWith: { none: { id: userId } },
          },
          include: { freindsOf: true, freindsWith: true },
        });
        console.log(users);

        res.status(200).json({ message: "Users Founded", users });
      }, 500);

      debouncedSearch();
    }
    if (operationType === "findChat") {
      const chatObject = await prisma.freindsChatObject.findFirst({
        where: {
          chatCreatorId: { in: [userId, friendId] },
        },
        include: {
          chat: {
            include: { content: { include: { file: true } }, creator: true },
            orderBy: { createdAt: "desc" },
            take: +chatLimit || 10,
          },
        },
      });

      res.status(200).json({ message: "Chat Founded", chatObject });
    }
  } catch (error) {
    res.status(409).json({ message: "No Users Found ❌" });
  }
};

module.exports = getUsersController;
