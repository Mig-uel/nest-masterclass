import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostType, Status } from '../types/types';
import { Tag } from './../../tags/entities/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 32,
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
  publishOn?: Date;

  @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
    cascade: true,
    eager: true,
  })
  metaOptions?: MetaOption;

  @ManyToOne(() => User, (user) => user.posts, {
    eager: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    eager: true,
  })
  @JoinTable()
  tags?: Tag[];
}
