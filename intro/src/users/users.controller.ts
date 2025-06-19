import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

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
  createUsers(@Body() body: any): Record<string, string> {
    console.log(body);
    return {};
  }
}
