import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, type Repository } from 'typeorm';
import { CreateTagDto } from './dtos/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
  ) {}

  /**
   * Method to create a new tag
   * @param createTagDto
   */
  async createTag(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  /**
   * Method to find all tags
   */
  async findAllTags() {
    return await this.tagsRepository.find({});
  }

  /**
   * Method to find multiple tags by ID
   * @param tags
   * @returns string[]
   */
  async findMultipleTags(tags: string[]) {
    const results = await this.tagsRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }
}
