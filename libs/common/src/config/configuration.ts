export default () => ({
    authServiceUrl: process.env.AUTH_SERVICE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
    kafkaBroker: process.env.KAFKA_BROKER!,
    authPort: process.env.AUTH_SERVICE_PORT!,
    fraudEnginePort: process.env.FRAUD_ENGINE_SERVICE_PORT!,
    notificationPort: process.env.NOTIFICATION_SERVICE_PORT!,
    transactionPort: process.env.TRANSACTION_SERVICE_PORT!,
    baseUrl: process.env.BASE_URL!,
    fraudEngineServiceUrl: process.env.FRAUD_ENGINE_SERVICE_URL!,
    notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL!,
    transactionServiceUrl: process.env.TRANSACTION_SERVICE_URL!,
});