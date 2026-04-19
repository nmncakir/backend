import * as Joi from "joi";

export const validationSchema = Joi.object({
    AUTH_SERVICE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().default('3600'),
    KAFKA_BROKER: Joi.string().required(),
    AUTH_SERVICE_PORT: Joi.number().required(),
    FRAUD_ENGINE_SERVICE_PORT: Joi.number().required(),
    NOTIFICATION_SERVICE_PORT: Joi.number().required(),
    TRANSACTION_SERVICE_PORT: Joi.number().required(),
    BASE_URL: Joi.string().required(),
    FRAUD_ENGINE_SERVICE_URL: Joi.string().required(),
    NOTIFICATION_SERVICE_URL: Joi.string().required(),
    TRANSACTION_SERVICE_URL: Joi.string().required(),
});