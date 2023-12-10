import { Request, Response } from 'express';
import { createuser } from './../prisma';
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");

const loginuser = async (req:Request, res:Response) => {

  const { username, pass } = req.body;
 const cc = await createuser()
 console.log(cc)
  const target = await userSchema.findOne({ username });
console.log(target,"##############")
  if (!target || (!username && !pass))
    return res
      .status(404)
      .json({ message: "user not found or no valid data passed " });

  const rightpass = await bcrypt.compare(pass, target.pass);

  if (!rightpass) return res.status(401).json({ message: "wrong password" });
  if (rightpass) {
    const roles = Object.values(target.roles);

    const accessToken = jwt.sign(
      {
        userinfo: {
          username: target.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "800s" }
    );

    const refreshToken = jwt.sign(
      {
        username: target.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const upres = await userSchema.findOneAndUpdate(
      { username },
      { refreshToken },
      { new: true }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken ,check: cc});
  }
};

module.exports = loginuser;
