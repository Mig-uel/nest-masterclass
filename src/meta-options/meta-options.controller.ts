import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOptionsService } from './meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  /**
   * Route for creating a post meta option
   * @param createPostMetaOptionsDto
   * @returns
   */
  @Post()
  create(@Body() createPostMetaOptionsDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createPostMetaOptionsDto);
  }
}
