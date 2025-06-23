import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from './dtos/create-meta-options.dto';
import { MetaOption } from './entities/meta-option.entity';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  /**
   * Method for creating a post meta option
   * @param createMetaOptionDto
   * @returns
   */
  async create(createMetaOptionDto: CreateMetaOptionsDto) {
    const metaOption = this.metaOptionsRepository.create(createMetaOptionDto);

    return await this.metaOptionsRepository.save(metaOption);
  }
}
