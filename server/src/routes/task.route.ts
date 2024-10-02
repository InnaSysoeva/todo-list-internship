import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskState
} from "@controllers/task.controller";

const router = express.Router();
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/all", getAllTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskState);

export default router;
