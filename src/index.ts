import { credentials } from './middleware/credentials';

import { connectToDB } from './config/dbconfig';
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import cookieParser from 'cookie-parser';



dotenv.config();

const Port = process.env.PORT || 5000;
const allowedHeaders = require("./config/corsOptions");
const server = express();

connectToDB();

server.use(cookieParser());
server.use(credentials);
server.use(cors({ origin: allowedHeaders, optionsSuccessStatus: 200 }));
server.use(express.urlencoded({ extended: false }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// routes _____________________________________________
server.use("/", require("./routes/root"));
server.use("/subdir", require("./routes/subdir"));
server.use("/register", require("./routes/register"));
server.use("/login", require("./routes/login"));
server.use("/refresh", require("./routes/refresh"));
server.use("/logout", require("./routes/logout"));
server.use("/emp", require("./routes/api/employees"));
// // __________________________________________________________

server.all("*", (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {

  server.listen(Port, () => console.log(`listening on port ${Port}`));
});

process.on("uncaughtException", (e) =>
  console.error(e, "___________________________________")
);


export default server