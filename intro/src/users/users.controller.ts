import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';

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
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
  ): Record<string, any> {
    const { id } = getUserParamDto;

    return {
      message: id ? 'Params passed' : 'No params passed',
      params: id || 'N/A',
      limit: limit || 'N/A',
      page: page || 'N/A',
    };
  }

  @Post()
  createUsers(
    @Body() createUserDto: CreateUserDto,
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

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
