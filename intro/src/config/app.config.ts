export const appConfig = () => ({
  environment: process.env.NODE_ENV || 'prod',

  database: {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT as string) || 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: process.env.DB_SYNC === 'true',
    autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
  },
});
