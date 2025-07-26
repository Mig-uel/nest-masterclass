import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Global, Module } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { join } from 'path';
import MailConfig from 'src/config/mail.config';
import { MailService } from './providers/mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [MailConfig.KEY],
      useFactory(mailConfig: ConfigType<typeof MailConfig>) {
        return {
          transport: {
            host: mailConfig.mailHost!,
            secure: false,
            port: 2525,
            auth: {
              user: mailConfig.smtpUsername,
              pass: mailConfig.smtpPassword,
            },
          },
          defaults: {
            from: `My Blog <no-reply@nestjs-blog.com>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new EjsAdapter({
              inlineCssEnabled: true,
            }),
            options: {
              strict: false,
            },
          },
        };
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
