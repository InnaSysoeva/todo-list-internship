import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dateStart: Joi.string().required(),
  dateEnd: Joi.string().required(),
  state: Joi.number().required(),
  priority: Joi.number().required(),
});

export const taskValidator = (task: object) => {
  return taskSchema.validate(task);
};
