import { TaskModel } from "@models/task.model";
import { SortOrder } from "enums/sortOrder.enum";
import { TaskStateEnum } from "@models/task.model";
import { TaskType } from "types/task.type";
import { parseCSV } from "@utils/csv.parser";

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

export const updateTaskStateService = async (
  taskId: string,
  taskState: Number,
) => {
  const updatedTask = await TaskModel.findByIdAndUpdate(
    taskId,
    { state: taskState },
    { new: true },
  );

  return updatedTask;
};

export const getTasksByPageService = async (
  tableParams: {
    page: number;
    filter: TaskStateEnum;
    sort: { field: string; order: SortOrder };
    search: string;
  },
  limit: number,
) => {
  const { page, filter, sort, search } = tableParams;
  const query = TaskModel.find();

  if (search) {
    const regex = new RegExp(search, "i");
    query.or([
      { title: { $regex: regex } },
      { description: { $regex: regex } },
      { dateStart: { $regex: regex } },
      { dateEnd: { $regex: regex } },
    ]);
  }

  if (filter && Object.values(TaskStateEnum).includes(filter)) {
    query.where("state").equals(filter);
  }

  if (sort && sort.order !== SortOrder.None) {
    query.sort({ [sort.field]: sort.order });
  }

  const totalDocuments = await query.clone().countDocuments();
  const tasks = await query.limit(limit).skip((page - 1) * limit);

  return {
    totalDocuments,
    tasks,
  };
};

export const createTasksFromCsvFileService = async (csvData: string) => {
  const parsedTasks = await parseCSV(csvData);

  return await TaskModel.insertMany(parsedTasks);
};
