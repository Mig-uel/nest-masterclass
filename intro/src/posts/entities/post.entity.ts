import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType, Status } from '../types/types';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';

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
    unique: true,
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

  // @Column({
  //   nullable: true,
  //   type: 'array',
  // })
  // tags?: string[];

  @ManyToOne(() => MetaOption)
  @JoinColumn()
  metaOption?: MetaOption;
}
