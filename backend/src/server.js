import express from "express";
import authRouter from "../routes/auth.route.js";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { ConnectDB } from "../libs/db.js";
import cookieParser from "cookie-parser"
import messageRouter from "../routes/message.route.js";
import cors from "cors";
import { app, server } from "../libs/socket.js";

dotenv.config()

ConnectDB();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});