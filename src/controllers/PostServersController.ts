import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const PostServersontoller = async (req: Request, res: Response) => {
const prisma = new PrismaClient();

const {
    userId,
    serverData,
}: { serverData: { imageUrl: string; name: string }; userId: string } =
    req.body;

if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
}
console.log({
    data: {
    ...serverData,
    members: {
        create:{memberId:userId,userType:"admin"}
    },
    }
})
try {

    const serverinitialization = await prisma.server.create({
    data: {
    ...serverData,
    members: {
        create:{memberId:userId,userType:"admin"}
    },
    channels:{create:{name:"general",type:"text",creatorId:userId,}},
    },include:{channels:true,members:{include:{member:true}}}
});

console.log(serverinitialization)

res.status(202).json({ message: `${serverData.name} created successfully ☑️ `
,serverinitialization })


} catch (error) {
    console.log(error)
 res.status(409).json({ message: `\"${serverData.name}\" was not created because it already exists ❌ ` })
    
}


};

module.exports = PostServersontoller;
