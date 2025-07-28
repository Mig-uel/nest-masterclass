import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: '',
  database: '',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
