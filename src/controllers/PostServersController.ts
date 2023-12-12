import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const PostServersontoller = async (req: Request, res: Response) => {
const prisma = new PrismaClient();

const {
    userId,
    serverData,
}: { serverData: { imageUrl: string; name: string }; userId: string } =
    req.body;
try {
    const serverinitialization = await prisma.server.create({
    data: {
    ...serverData,
    members: {
        create:{memberId:userId,userType:"admin"}
    },
    },include:{channels:true,members:{include:{member:true}}}
});


res.status(202).json({ message: `${serverData.name} created successfully ☑️ `
,serverinitialization })


} catch (error) {
 res.status(409).json({ message: `\"${serverData.name}\" was not created because it already exists ❌ ` })
    
}

if (!userId) {
    return res.status(404).json({ message: "No valid data passed " });
}

};

module.exports = PostServersontoller;
