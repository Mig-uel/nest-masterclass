import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostType, Status } from '../types/types';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
    nullable: false,
  })
  title: string;

  @Column({
    default: PostType.POST,
    enum: PostType,
    nullable: false,
  })
  postType: PostType;

  @Column({
    nullable: false,
  })
  slug: string;

  @Column({
    default: Status.DRAFT,
    enum: Status,
    nullable: false,
  })
  status: Status;

  @Column({
    nullable: true,
  })
  content?: string;

  @Column({
    nullable: true,
    type: 'json',
  })
  schema?: string;

  @Column({
    default: 'https://placehold.co/800x400',
    nullable: true,
  })
  featuredImageUrl?: string;

  @Column({
    nullable: true,
    type: 'timestamptz',
  })
  publishOn?: string;

  @Column({
    nullable: true,
    type: 'array',
  })
  tags?: string[];

  @Column({
    nullable: true,
    type: 'array',
  })
  metaOptions?: Record<string, any>[];
}
