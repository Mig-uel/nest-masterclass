import { Exclude } from 'class-transformer';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: '25',
    nullable: false,
  })
  firstName: string;

  @Column({
    length: 25,
    nullable: true,
  })
  lastName?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  password?: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @OneToMany(() => Post, (post) => post.author, {
    onDelete: 'CASCADE',
  })
  posts: Post[];
}
