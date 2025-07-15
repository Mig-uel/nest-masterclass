import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import type { FindOptionsSelect, Repository } from 'typeorm';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import type { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  async paginateQuery<T extends Record<string, any>>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    select?: FindOptionsSelect<T>,
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;

    const results = await repository.find({
      skip: (page! - 1) * limit!,
      take: limit,
      select,
    });

    // TODO => implement cleaner url building logic
    // Create the request URLs
    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const linksBase = new URL(this.request.url, baseUrl);

    // Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit!);
    const nextPage = page === totalPages ? page : page! + 1;
    const previousPage = page === 1 ? page : page! - 1;

    // Response
    const response: Paginated<T> = {
      data: results,
      meta: {
        currentPage: page!,
        itemsPerPage: limit!,
        totalItems,
        totalPages,
      },
      links: {
        current: `${linksBase.origin}${linksBase.pathname}?limit=${limit}&page=${page}`,
        first: `${linksBase.origin}${linksBase.pathname}?limit=${limit}&page=1`,
        last: `${linksBase.origin}${linksBase.pathname}?limit=${limit}&page=${totalPages}`,
        next: `${linksBase.origin}${linksBase.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${linksBase.origin}${linksBase.pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return response;
  }
}
