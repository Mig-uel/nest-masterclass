import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { Tag } from '../tag.schema';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private readonly tagModel: Model<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const tag = new this.tagModel(createTagDto);

    return await tag.save();
  }
}
