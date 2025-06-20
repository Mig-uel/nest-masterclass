import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Post,
  Query,
} from '@nestjs/common';

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
    @Param('id') id?: string,
    @Query('limit') limit?: string,
  ): Record<string, string> {
    return {
      message: id ? 'Params passed' : 'No params passed',
      params: id || 'N/A',
      limit: limit || 'N/A',
    };
  }

  @Post()
  createUsers(
    @Body('email') email: string,
    // Get headers from request
    @Headers() headers: any,
    // Get IP address of the request
    @Ip() ip: any,
  ): Record<string, string> {
    console.log(email);
    console.log(headers);
    console.log(ip);
    return {};
  }
}
