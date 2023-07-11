import Joi from "joi";

export const createCourseTypeValidation = Joi.object({
  name: Joi.string().alphanum().required().min(1).max(30),
  // password: Joi.string().required(),
});
