export const KAFKA_TOPICS = {
    EMAIL_WAITING : 'email.waiting',
    EMAIL_COMPLETED : 'email.completed',
    EMAIL_FAILED : 'email.failed',
    FRAUD_WAITING : 'fraud.waiting',
    FRAUD_COMPLETED : 'fraud.completed',
    FRAUD_FAILED : 'fraud.failed',
    TRANSACTION_WAITING : 'transaction.waiting',
    TRANSACTION_COMPLETED : 'transaction.completed',
    TRANSACTION_FAILED : 'transaction.failed',
} as const;