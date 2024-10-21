import React, { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { updateTask } from "../api/taskAPI";
import { getTaskById } from "../api/taskAPI";
import { TaskFormType } from "../types/taskForm.type";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { TaskType } from "../types/task.type";
import { StateEnum } from "../enums/state.enum";

interface UpdateComponentProps {
  onTaskUpdated: (response: { data: TaskType }) => void;
  taskId: string;
}

export const UpdateComponent: React.FC<UpdateComponentProps> = ({
  onTaskUpdated,
  taskId,
}) => {
  const [task, setTask] = useState<TaskFormType>();
  const [taskState, setTaskState] = useState<number>(StateEnum.Active);

  const fetchTaskById = async (): Promise<void> => {
    const response = await getTaskById(taskId);
    const taskFormInput = {
      title: response.data.title,
      description: response.data.description,
      priority: response.data.priority,
      dateStart: response.data.dateStart,
      dateEnd: response.data.dateEnd,
    };
    setTaskState(response.data.state);
    setTask(taskFormInput);
  };

  useEffect(() => {
    fetchTaskById();
  }, []);

  const handleUpdateTask = async (formData: TaskFormType): Promise<void> => {
    const updatedTask = {
      ...formData,
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
