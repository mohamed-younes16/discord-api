import { Request, Response } from "express";
import { createuser, getUser } from "./../prisma";
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

const loginuser = async (req: Request, res: Response) => {
  const { data } = req.body;
  console.log(data)

  if (!data) {
    return res
      .status(404)
      .json({ message: "user not found or no valid data passed " });
  }

  // if (!rightpass) return res.status(401).json({ message: "wrong password" });
  if (data) {
    // const roles = Object.values(target.roles);

    // const accessToken = jwt.sign(
    //   {
    //     userinfo: {
    //       username: target.username,
    //       roles,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "800s" }
    // );

    // const refreshToken = jwt.sign(
    //   {
    //     username: target.username,
    //   },
    //   process.env.REFRESH_TOKEN_SECRET,
    //   { expiresIn: "1d" }
    // );

    // const upres = await userSchema.findOneAndUpdate(
    //   { username },
    //   { refreshToken },
    //   { new: true }
    // );

    // res.cookie("jwt", refreshToken, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });
    const createUser = await getUser(data.id)

    res.json({ user: createUser });

  }
};

module.exports = loginuser;
