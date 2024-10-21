import express from "express";
import {
  createTask,
  createTasksFromCsvFile,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByPage,
  updateTask,
  updateTaskState,
} from "@controllers/task.controller";
import multer from "multer";

const upload = multer();
const router = express.Router();
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskState);
router.get("/sort/:limit", getTasksByPage);
router.post("/upload", upload.single("file"), createTasksFromCsvFile);

export default router;
