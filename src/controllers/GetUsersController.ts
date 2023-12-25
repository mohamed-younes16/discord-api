import { Request, Response } from "express";
import { prisma } from "../prisma";
var _ = require("lodash");

const getUsersController = async (req: Request, res: Response) => {
  const { userId, username }: any = req.query;

  if (!userId) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  try {
    // Debounce the function to wait for a short delay before making the API call
    const debouncedSearch = _.debounce(async () => {
      const users = await prisma.user.findMany({
        where: {
          username: { contains: username },
          id: { not: userId },
          freindsOf: { none: { id: userId } },
          freindsWith: { none: { id: userId } },
        },
        include:{freindsOf:true,freindsWith:true},
      });
      console.log(users);

      res.status(200).json({ message: "Users Founded", users });
    }, 500);

    // Call the debounced function
    debouncedSearch();
  } catch (error) {
    res.status(409).json({ message: "No Users Found ❌" });
  }
};

module.exports = getUsersController;
