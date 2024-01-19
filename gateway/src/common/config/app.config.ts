export const GATEWAY_SERVICE_PORT = process.env.GATEWAY_SERVICE_PORT ?? 8000;

export const MONGO_CONNECTION =
  process.env.MONGO_CONNECTION ?? 'mongodb+srv://mfaisalusama:zjasUMI2RHCp3Fta@cluster0.1hxkj4a.mongodb.net/?retryWrites=true&w=majority';
export const TODO_SERVICE_PORT = process.env.TODO_SERVICE_PORT ?? 3000;
export const TODO_SERVICE_HOST = process.env.TODO_SERVICE_HOST ?? '0.0.0.0';
export const ENABLE_CRON = process.env.ENABLE_CRON ?? true;
export const CRON_TIME = process.env.CRON_TIME ?? '10 * * * * *';
