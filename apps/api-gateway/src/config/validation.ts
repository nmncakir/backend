import * as Joi from "joi";

export const validationSchema = Joi.object({
    AUTH_SERVICE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('3600'),
});