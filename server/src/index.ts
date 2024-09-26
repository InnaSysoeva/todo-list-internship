import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

app.use(express.json());

app.get("/", (request: Request, result: Response) => {
  result.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
