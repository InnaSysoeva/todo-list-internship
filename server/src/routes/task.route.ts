import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "@controllers/task.controller";

const router = express.Router();
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);

export default router;
