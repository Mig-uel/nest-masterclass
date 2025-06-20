import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  /**
   * Endpoint - /users/id?limit=10&page=1
   * Param id - optional, convert to integer, cannot have a default value
   * Query limit - integer, default value of 10
   * Query page - integer, default value of 1
   *
   * ==> Use Cases
   * /users/ => returns all users with default pagination
   * /users/1234 => returns one user with id of 1234
   * /users?limit=10&page=2 => returns page 2 with limit of 10
   */
  @Get('{/:id}')
  getUsers(
    @Param(
      'id',
      new ParseIntPipe({
        optional: true,
      }),
    )
    id?: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): Record<string, any> {
    return {
      message: id ? 'Params passed' : 'No params passed',
      params: id || 'N/A',
      limit: limit || 'N/A',
      page: page || 'N/A',
    };
  }

  @Post()
  createUsers(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
    @Headers() _: any, // Get headers from request
    @Ip() ip: string, // Get IP address of the request
  ): CreateUserDto & { ip: string } {
    return {
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
      ip,
    };
  }
}
