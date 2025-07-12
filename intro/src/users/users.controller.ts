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
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Inject Users Service
  constructor(private readonly usersService: UsersService) {}

  @Get('{/:id}')
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The page number that you want the API to return',
    example: 1,
  })
  getUsers(
    @Param() getUserParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ): Record<string, any> {
    const { id } = getUserParamDto;

    if (!id) return this.usersService.findAll(limit, page);

    return this.usersService.findOneById(id.toString());
  }

  /**
   * Post route to create user
   * @param createUserDto
   * @param _
   * @param ip
   * @returns
   */
  @Post()
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() _: any, // Get headers from request
    @Ip() ip: string, // Get IP address of the request
  ) {
    console.log(ip);

    return this.usersService.create(createUserDto);
  }

  @Post('create-many')
  createManyUsers(@Body() createUsersDto: CreateUserDto[]) {
    return this.usersService.createMany(createUsersDto);
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
