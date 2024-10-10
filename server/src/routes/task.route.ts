import express from "express";
import { createTask, updateTask } from "@controllers/task.controller";

const router = express.Router();
router.post("/", createTask);
router.put("/:id", updateTask);

export default router;
