import { Request, Response } from "express";



const GetServersontoller = async (req: Request, res: Response) => {
  const { userId } = req.body;

  

  if (!userId) {
    return res
      .status(404)
      .json({ message: "No valid data passed " });
  }

  if (userId) {


    res.json({  });

  }
};

module.exports = GetServersontoller;
