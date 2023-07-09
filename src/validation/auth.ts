import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*~]).{6,20}$"
      )
    )
    .required(),
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
    .required(),
  confirmPassword: Joi.ref("password"),
});
