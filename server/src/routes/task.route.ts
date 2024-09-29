import express from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "@controllers/task.controller";

const router = express.Router();
router.post("/tasks", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export default router;
