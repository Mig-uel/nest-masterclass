import { Injectable } from '@nestjs/common';
import type { Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';

@Injectable()
export class PaginationProvider {
  async paginateQuery<T extends Record<string, any>>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    const { limit, page } = paginationQuery;

    return await repository.find({
      skip: (page! - 1) * limit!,
      take: limit,
    });
  }
}
