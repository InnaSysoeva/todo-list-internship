import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { updateTask } from "../api/taskAPI";
import { getTaskById } from "../api/taskAPI";
import { TaskFormInputType } from "../types/taskFormInput.type";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const UpdateComponent = ({ onTaskUpdated, taskId }) => {
  const [task, setTask] = useState<TaskFormInputType>();
  const [taskState, setTaskState] = useState<number>(1);

  const fetchTaskById = async () => {
    const response = await getTaskById(taskId);
    const taskFormInput = {
      title: response.data.title,
      description: response.data.description,
      priority: response.data.priority,
      dateStart: response.data.dateStart,
      dateEnd: response.data.dateEnd,
    };
    console.log(taskFormInput);
    setTaskState(response.data.state);
    setTask(taskFormInput);
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  const handleUpdateTask = async (formData: {
    title: string;
    description: string;
    priority: number;
    dateStart: string;
    dateEnd: string;
  }) => {
    const updatedTask = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dateStart: formData.dateStart,
      dateEnd: formData.dateEnd,
      state: taskState,
    };

    const response = await updateTask(taskId, updatedTask);
    onTaskUpdated(response);
  };

  if (!task) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <TaskForm onSubmit={handleUpdateTask} initialTask={task} />;
};
