import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const PatchServersontoller = async (req: Request, res: Response) => {
  const {
    userId,
    serverId,
    operationType,
    invitationLink,
  }: {
    userId: string;
    serverId: string;
    operationType: "addingMember" | "addingChat" | "editingServer";
    invitationLink: string;
  } = req.body;
  const prisma = new PrismaClient();
  let ServerUpdate :any
console.log(req.body)
  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    if (operationType=="addingMember"){
ServerUpdate = await prisma.server.update({where:{invitationLink},
  data:{members:{create:{memberId:userId,userType:"member"}}}})
    }

    console.log(ServerUpdate)
    res
    .status(201)
    .json({ message: ` User Added to Server ✅  ` });


  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: ` Error Happend in the update operation ❌ ` });
  }
};

module.exports = PatchServersontoller;
