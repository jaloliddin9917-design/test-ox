import { Injectable, BadRequestException } from '@nestjs/common';
import { OxApiService } from '../ox-api/ox-api.service.js';
import type { User, Company } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly oxApiService: OxApiService) {}

  async getProducts(
    user: User & { company: Company | null },
    page: number,
    size: number,
  ) {
    if (!user.company) {
      throw new BadRequestException('User is not associated with a company');
    }

    return this.oxApiService.getProducts(
      user.company.subdomain,
      user.company.oxToken,
      page,
      size,
    );
  }
}
