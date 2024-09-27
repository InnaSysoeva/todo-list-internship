import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dateStart: Joi.string().required(),
  dateEnd: Joi.string().required(),
  state: Joi.number().required(),
});

export const validateTask = (task: any) => {
  return taskSchema.validate(task);
};
