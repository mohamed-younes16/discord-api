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

 const operation =  await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
  return operation
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
    operationType: "friendRequest" | "friendRequestHandle";
    friendRequestDecision: "accept" | "decline";
  } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  console.log({ userId, operationType, friendRequestDecision, friendId });

  try {
    if (operationType === "friendRequest") {
      await prisma.user.update({
        where: { id: friendId },
        data: { freindsRequestedFrom: { connect: { id: userId } } },
      });

      res.status(202).json({
        message: `Requested successfully ☑️`,
      });
    } else if (operationType === "friendRequestHandle") {

      const gg = await handleFriendRequest(
        userId,
        friendId,
        friendRequestDecision
      );
      console.log(gg)

      res.status(202).json({
        message:
          friendRequestDecision === "accept"
            ? `Added Friend successfully ☑️`
            : `Declined Friend Request`,
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
