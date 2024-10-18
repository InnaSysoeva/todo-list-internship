import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDataBase from "./configs/database.config";
import taskRouter from "@routes/task.route";
import { ErrorHandler } from "@middleware/error.handler";

dotenv.config();
connectDataBase();

const app = express();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;

app.use(cors({
    origin: 'https://todo-list-internship-client.onrender.com'
}));
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", taskRouter);
app.use(ErrorHandler);

app.get("/", (request: Request, result: Response) => {
  result.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
