import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "@controllers/task.controller";

const router = express.Router();
router.post("/tasks", createTask);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);
router.get("/all", getAllTasks);
router.get("/:id", getTaskById);

export default router;
