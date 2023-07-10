import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  // password: Joi.string()
  //   .pattern(
  //     new RegExp(
  //       "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{6,20}$"
  //     )
  //   )
  //   .required()
  //   .messages({
  //     "string.pattern.base":
  //       '"password" must contain 6 to 20 characters with at least one of each: uppercase, lowercase, number and special',
  //   }),
});

export const registerValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{6,20}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        '"password" must contain 6 to 20 characters with at least one of each: uppercase, lowercase, number and special',
    }),
  confirmPassword: Joi.ref("password"),
});
