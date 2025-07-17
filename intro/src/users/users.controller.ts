import {
  Body,
  Controller,
  Get,
  Headers,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import type { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import type { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Inject Users Service
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Fetches a registered user on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the param',
  })
  getUsers(@Param() getUserParamDto: GetUsersParamDto): Promise<User> {
    const { id } = getUserParamDto;

    return this.usersService.findOneById(id);
  }

  @Get()
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
  getAllUsers(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    return this.usersService.findAll(paginationQuery);
  }

  /**
   * Route to create user
   * @param createUserDto
   * @param _
   * @param ip
   * @returns
   */
  @Post()
  // @SetMetadata('authType', 'none') // set custom metadata
  @Auth(AuthType.None)
  createUser(
    @Body() createUserDto: CreateUserDto,
    @Headers() _: any, // Get headers from request
    @Ip() ip: string, // Get IP address of the request
  ) {
    console.log(ip);

    return this.usersService.create(createUserDto);
  }

  @Post('create-many')
  @UseGuards(AccessTokenGuard)
  createManyUsers(@Body() createUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createUsersDto);
  }

  @Patch()
  patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
