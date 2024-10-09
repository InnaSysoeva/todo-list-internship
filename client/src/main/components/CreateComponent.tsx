import React from "react";
import { createTask } from "../api/taskAPI";
import { TaskForm } from "./TaskForm";

export const CreateComponent = ({ onTaskCreated }) => {
  const handleCreateTask = async (formData: {
    title: string;
    description: string;
    priority: number;
    dateStart: string;
    dateEnd: string;
  }) => {
    const task = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      state: 1,
    };

    const response = await createTask(task);
    onTaskCreated(response);
  };

  return <TaskForm onSubmit={handleCreateTask} />;
};
