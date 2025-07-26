import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: '',
  username: '',
  password: '',
  database: '',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
