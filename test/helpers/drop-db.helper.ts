import { type ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDB(configService: ConfigService): Promise<void> {
  // Create the connection datasource
  const AppDataSource = await new DataSource({
    type: 'postgres',
    host: configService.get('database.host'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.database'),
    synchronize: configService.get('database.synchronize'),
    ssl: {
      rejectUnauthorized: false,
    },
  }).initialize();

  // Drop all tables
  await AppDataSource.dropDatabase();

  // Close the connection
  await AppDataSource.destroy();
}
