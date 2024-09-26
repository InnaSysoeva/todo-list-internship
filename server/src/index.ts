import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from './configs/db.connection'

dotenv.config();

connectDB();

const app = express();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

app.use(cors());
app.use(express.json());

app.get("/", (request: Request, result: Response) => {
  result.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
