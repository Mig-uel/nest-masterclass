import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersCreateMany {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Method to create many users
   * @param createUsersDto
   */
  async createMany(createUsersDto: CreateManyUsersDto) {
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
      for (const user of createUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);

        usersCreated.push(result);
      }

      // If successful, commit to the database
      await queryRunner.commitTransaction();
    } catch (error) {
      // If unsuccessful, rollback the changes
      await queryRunner.rollbackTransaction();

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
        {
          description: String(error),
        },
      );
    }

    try {
      // Release the connection, regardless of status
      await queryRunner.release();
    } catch (error) {
      throw new RequestTimeoutException('Could not release the connection', {
        description: String(error),
      });
    }

    return usersCreated;
  }
}
