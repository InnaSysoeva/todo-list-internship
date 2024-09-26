import { TaskModel } from "@models/task.model";
import { Task } from "@models/task.class";

export const createTaskService = async (task: Task) => {
    const newTask = new TaskModel({
        title: task.title,
        description: task.description,
        dateStart: task.dateStart,
        dateEnd: task.dateEnd,
        state: task.state,
        priority: task.priority
    })
    await newTask.save()
    return newTask
}