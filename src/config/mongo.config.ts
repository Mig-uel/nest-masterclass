import { registerAs } from '@nestjs/config';

export default registerAs('mongo', () => ({
  mongoURI: process.env.MONGO_URI,
  mongoDBName: process.env.MONGO_DB_NAME,
}));
