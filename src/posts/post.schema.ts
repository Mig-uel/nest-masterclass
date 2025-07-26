import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PostStatus } from './enums/post-status.enum';
import { PostType } from './enums/post-type.enum';

@Schema({
  timestamps: true,
})
export class Post extends Document {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: PostType,
    default: PostType.POST,
  })
  postType: PostType;

  @Prop({
    type: String,
    required: true,
  })
  slug: string;

  @Prop({
    type: String,
    isRequired: true,
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus;

  @Prop({
    type: String,
    required: false,
  })
  content?: string;

  @Prop({
    type: String,
    required: false,
  })
  featuredImageUrl?: string;

  @Prop({
    type: Date,
    required: false,
  })
  publishOn?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
