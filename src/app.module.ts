import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import MongoConfig from './config/mongo.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { TagsService } from './providers/tags/tags.service';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [MongoConfig],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    MongooseModule.forRootAsync({
      inject: [MongoConfig.KEY],
      useFactory(mongoConfig: ConfigType<typeof MongoConfig>) {
        return {
          uri: mongoConfig.mongoURI,
          dbName: mongoConfig.mongoDBName,
        };
      },
    }),
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, TagsService],
})
export class AppModule {}
