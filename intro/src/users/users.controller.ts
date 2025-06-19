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
