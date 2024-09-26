import Joi from 'joi'
import { TaskModel } from '@models/task.model'
import { TaskStateEnum } from '@models/task.model'

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    dateStart: Joi.string().required(),
    dateEnd: Joi.string().required(),
    state: Joi.number().required(),
    priority: Joi.string().required()
})

export const validateTask = (task: any) => {
    return taskSchema.validate(task);
};