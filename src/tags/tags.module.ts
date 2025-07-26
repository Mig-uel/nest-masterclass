import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagsService } from './providers/tags.service';
import { Tag, TagSchema } from './tag.schema';
import { TagsController } from './tags.controller';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
})
export class TagsModule {}
