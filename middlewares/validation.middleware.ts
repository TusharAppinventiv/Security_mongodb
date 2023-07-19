import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.body = value;
    next();
  };
};

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const registerUserMiddleware = validateSchema(registerSchema);
export const loginUserMiddleware = validateSchema(loginSchema);
