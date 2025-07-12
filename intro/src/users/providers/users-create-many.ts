import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersCreateMany {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Method to create many users
   * @param createUsersDto
   */
  async createMany(createUsersDto: CreateUserDto[]) {
    // Store created users
    const usersCreated: User[] = [];

    // Create a QueryRunner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect QueryRunner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();

      // Loop through the createUsersDto array
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);

        usersCreated.push(result);
      }

      // If successful, commit to the database
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      // If unsuccessful, rollback the changes
      await queryRunner.rollbackTransaction();
    } finally {
      // Release the connection, regardless of status
      await queryRunner.release();
    }

    return usersCreated;
  }
}
