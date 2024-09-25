import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (request: Request, result: Response) => {
  result.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
