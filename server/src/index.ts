import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;
const mongoURI = process.env.MONGO_URI || '';

app.use(cors());
app.use(express.json());


mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.log('MongoDb connection error: ', error))

app.get("/", (request: Request, result: Response) => {
  result.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
