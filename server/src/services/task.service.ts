import { TaskModel } from "@models/task.model";

export const createTaskService = async (task: any) => {
  const newTask = new TaskModel(task);
  await newTask.save();

  return newTask;
};

export const updateTaskService = async (taskId: string, task: any) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, task, {
    new: true,
  });

  return updatedTask;
};

export const deleteTaskService = async (taskId: string) => {
  return await TaskModel.findByIdAndDelete(taskId);
};

export const getAllTasksService = async () => {
  return await TaskModel.find();
};

export const getTaskByIdService = async (taskId: string) => {
  return await TaskModel.findById(taskId);
};

export const updateTaskStateService = async (taskId: string, taskState: Number) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    { state: taskState },
    { new: true }
  );
  
  return updatedTask;
}
