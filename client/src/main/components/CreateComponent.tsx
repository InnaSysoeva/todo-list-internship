import React from "react";
import { createTask } from "../api/taskAPI";
import { TaskForm } from "./TaskForm";
import { FormDataType } from "../types/formData.type";
import { StateEnum } from "../enums/state.enum";

export const CreateComponent = ({ onTaskCreated }) => {
  const handleCreateTask = async (formData: FormDataType): Promise<void> => {
    const task = { ...formData, state: StateEnum.Active };
    onTaskCreated(await createTask(task));
  };

  return <TaskForm onSubmit={handleCreateTask} />;
};
