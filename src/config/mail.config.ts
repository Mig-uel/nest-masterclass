import { registerAs } from '@nestjs/config';

export default registerAs('mail', () => ({
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
