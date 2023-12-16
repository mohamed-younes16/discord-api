import { ioInstance } from "./../index";
import { Request, Response } from "express";
import { prisma } from "../prisma";

const PostServersontoller = async (req: Request, res: Response) => {
const {
    userId,
    operationType,
    serverId,
    messageData,
    channelId,
    memberId,
    chatLimit,
    messageId,
}: {
    userId: string;
    serverId: string;
    operationType: "createMessage" | "editMessage" | "deleteMessage";
    messageData: {
    message: string;
    fileUrl: string;
    fileType: "pdf" | "image";
    };
    channelId: string;
    memberId: string;
    chatLimit: number;
    messageId: string;
} = req.body;

if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
}

try {
    if (operationType === "createMessage") {
        console.log(chatLimit,"#############")
    const messageCreation = await prisma.channel.update({
        where: { id: channelId, serversBelongId: serverId },
        data: {
        chat: {
            create: {
            creatorId: memberId,
            content: {
                create: {
                text: messageData.message,
                file: {
                    create: {
                    url: messageData?.fileUrl,
                    fileType: messageData.fileType,
                    },
                },
                },
            },
            },
        },
        },
        include: {
        chat: {
            orderBy: { createdAt: "desc" },
            take: chatLimit || 10,
            include: {
            creator: { include: { member: true } },
            content: { include: { file: true } },
            },
        },
        },
    });

    ioInstance.emit(
        `message-server-${serverId}-channel-${channelId}`,
        messageCreation.chat
    );
    res.status(201).json({
        message: `message has been Sent successfully ☑️ `,
    });
    }
    else  if (operationType === "deleteMessage") {
        console.log({   userId,
            operationType,
            serverId,
            messageData,
            channelId,
            memberId,
            chatLimit,
            messageId,})
        const messageDeletion = await prisma.channel.update({
        where: { id: channelId, serversBelongId: serverId },
        data: {
            chat: {
            delete:{id:messageId}
            },
        },
        include: {
            chat: {
            orderBy: { createdAt: "desc" },
            take: chatLimit || 10,
            include: {
                creator: { include: { member: true } },
                content: { include: { file: true } },
            },
            },
        },
        });

        ioInstance.emit(
        `message-server-${serverId}-channel-${channelId}`,
        messageDeletion.chat
        );
        res.status(201).json({
        message: `message has been deleted successfully ☑️ `,
        });
    }

    else if (operationType === "editMessage") {
        console.log({
            userId,
            operationType,
            serverId,
            messageData,
            channelId,
            memberId,
            chatLimit,
            messageId,
        })
        const messageCreation = await prisma.channel.update({
            where: { id: channelId, serversBelongId: serverId },
            data: {
            chat: {
                update:{where:{id:messageId},data: {
                    content: {
                        update: {data:{text: messageData.message,
                    }
                        },
                    },
                    }}
            },
            },
            include: {
            chat: {
                orderBy: { createdAt: "desc" },
                take: chatLimit || 10,
                include: {
                creator: { include: { member: true } },
                content: { include: { file: true } },
                },
            },
            },
        })
        ioInstance.emit(
            `message-server-${serverId}-channel-${channelId}`,
            messageCreation.chat
        );
        ioInstance.emit(
            `message-server-${serverId}-channel-${channelId}`,
            messageCreation.chat
        );
        res.status(201).json({
            message: `message has been edited successfully ☑️ `,
        });
        }
} catch (error) {
    console.log(error);
    res.status(409).json({
    message: `was not deleted because of an Error  ❌ `,
    });
}
};

module.exports = PostServersontoller;
