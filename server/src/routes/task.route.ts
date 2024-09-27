import express from "express";
import { createTask, updateTask } from "@controllers/task.controller";

const router = express.Router();
router.post("/tasks", createTask);
router.put('/update/:id', updateTask);

export default router;
