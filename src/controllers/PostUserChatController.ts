import { $Enums } from "@prisma/client";
import { ioInstance } from "./../index";
import { Request, Response } from "express";
import { prisma } from "../prisma";

const PostServersontoller = async (req: Request, res: Response) => {
const {
    userId,
    operationType,
    messageData,

    chatLimit,
    messageId,
    chatId,
}: {
    userId: string;
    operationType: "createMessage" | "editMessage" | "deleteMessage";
    messageData: {
    message: string;
    fileUrl: string;
    fileType: "pdf" | "image";
    };
    chatLimit: number;
    messageId: string;
    chatId: string;
} = req.body;

if (!userId) {
    return res.status(401).json({ message: "Not Authorized " });
}

try {
    if (operationType === "createMessage") {
       
    const messageCreation = await prisma.freindsChatObject.update({
        where: { id: chatId },
        data: {
        chat: {
            create: {
            creatorId: userId,
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
            include: { creator: true, content: { include: { file: true } } },
        },
        },
    });

    ioInstance.emit(`message-chat-${chatId}`, messageCreation.chat);
    res.status(201).json({
        message: `message has been Sent successfully ☑️ `,
    });
    } else if (operationType === "deleteMessage") {

    const messageDeletion = await prisma.freindsChatObject.update({
        where: { id: chatId },
        data: {
        chat: {
            delete: { id: messageId },
        },
        },
        include: {
        chat: {
            orderBy: { createdAt: "desc" },
            take: chatLimit || 10,
            include: { creator: true, content: { include: { file: true } } },
        },
        },
    });

    ioInstance.emit(`message-chat-${chatId}`, messageDeletion.chat);
    res.status(201).json({
        message: `message has been deleted successfully ☑️ `,
    });
    } else if (operationType === "editMessage") {

    const messageCreation = await prisma.freindsChatObject.update({
        where: { id: chatId },
        data: {
        chat: {
            update: {
            where: { id: messageId },
            data: {
                content: {
                update: { data: { text: messageData.message } },
                },
            },
            },
        },
        },
        include: {
        chat: {
            orderBy: { createdAt: "desc" },
            take: chatLimit || 10,
            include: { creator: true, content: { include: { file: true } } },
        },
        },
    });
    ioInstance.emit(`message-chat-${chatId}`, messageCreation.chat);

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
