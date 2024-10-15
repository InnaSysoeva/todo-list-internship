import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getPagesCount,
  getTaskById,
  getTasksByPage,
  updateTask,
  updateTaskState,
} from "@controllers/task.controller";

const router = express.Router();
router.get("/pages", getPagesCount);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskState);
router.get("/sort/:limit", getTasksByPage);

export default router;
