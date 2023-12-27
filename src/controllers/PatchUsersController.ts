import { Request, Response } from "express";
import { prisma } from "../prisma";

const handleFriendRequest = async (
  userId: string,
  friendId: string,
  decision: "accept" | "decline"
) => {
  const updateData: any = {
    freindsRequestedFrom: { disconnect: { id: friendId } },
    freindsRequestedTo: { disconnect: { id: friendId } },
  };

  if (decision === "accept") {
    updateData.freindsWith = { connect: { id: friendId } };
  }

  const operation = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
  await prisma.freindsChatObject.create({
    data: { chatCreatorId: userId, ChatWithId: friendId },
  });
  return operation;
};

const PatchUsersController = async (req: Request, res: Response) => {
  const {
    userId,
    operationType,
    friendRequestDecision,
    friendId,
  }: {
    friendId: string;
    userId: string;
    operationType: "friendRequest" | "friendRequestHandle" | "deleteFriend" ;
    friendRequestDecision: "accept" | "decline";
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    if (operationType === "friendRequest") {
      await prisma.user.update({
        where: { id: friendId },
        data: { freindsRequestedFrom: { connect: { id: userId } } },
      });

      res.status(200).json({
        message: `Requested successfully ☑️`,
      });
    } else if (operationType === "friendRequestHandle") {
      await handleFriendRequest(userId, friendId, friendRequestDecision);

      res.status(200).json({
        message:
          friendRequestDecision === "accept"
            ? `Added Friend successfully ☑️`
            : `Declined Friend Request`,
      });
    } else if (operationType === "deleteFriend") {
      await prisma.freindsChatObject.deleteMany({
        where: {
          chatCreatorId: { in: [userId, friendId] },
          ChatWithId: { in: [userId, friendId] },
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          freindsWith: { disconnect: { id: friendId } },
          freindsOf: { disconnect: { id: friendId } },
        },
      });

      res.status(200).json({
        message: `Deleted Friend `,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({
      message: `Error Happened ❌`,
    });
  }
};

export default PatchUsersController;
