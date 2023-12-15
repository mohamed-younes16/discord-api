import { User } from "@prisma/client";
import { Request, Response } from "express";
import { createuser } from "../prisma";

const registerUser = async (req: Request, res: Response) => {
  // if (alredycreated || ( !username && !pass  )) return  res.status(409).json({
  //         "error": "User already exists or nodata check again",
  //         "message": "A user with this username already exists or no data passed ."
  //     })

  try {
    const data: User = req.body;
    const { onboarded } = req.query;
    const created = await createuser(data);

    // const alredycreated = await userSchema.findOne({username: username})

    // const hashedpass = await bcrypt.hash(pass,12)

    // const result = await userSchema.create({

    //     username,
    //         pass:hashedpass
    //     })

    created
      ? res.status(201).json({
          message: `${onboarded == "false" ? "Registered" : "Updated"} ${
            data.username
          } successfully☑️`,
        })
      : res.status(409).json({ message: `${data.username} already exists` });
  } catch (error: any) {
    res.status(500).send(error.toString());
  }
};

module.exports = registerUser;
