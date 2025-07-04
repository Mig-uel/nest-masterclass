import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.PG_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: process.env.DB_SYNC === 'true',
  autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
}));
