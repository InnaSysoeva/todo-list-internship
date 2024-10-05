import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "@controllers/task.controller";

const router = express.Router();
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/", getAllTasks);

export default router;
