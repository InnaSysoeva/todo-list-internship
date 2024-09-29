import mongoose from "mongoose";

export enum TaskStateEnum {
  Active = 1,
  InProgress = 2,
  Done = 3,
}

export enum TaskPriorityEnum {
  High = 1,
  Medium = 2,
  Low = 3,
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  dateStart: { type: String, required: true },
  dateEnd: { type: String, required: true },
  state: { type: Number, enum: TaskStateEnum, required: true },
  priority: { type: Number, enum: TaskPriorityEnum, required: true },
});

export const TaskModel = mongoose.model("Task", taskSchema);
