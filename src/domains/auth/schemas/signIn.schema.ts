import * as Joi from 'joi';

export const SignUpSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})