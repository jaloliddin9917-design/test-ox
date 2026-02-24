import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { OxApiService } from '../ox-api/ox-api.service.js';
import type { User } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly oxApiService: OxApiService,
  ) {}

  async registerCompany(
    user: User,
    subdomain: string,
    token: string,
  ) {
    // Validate with OX API
    await this.oxApiService.getProfile(subdomain, token);

    const existing = await this.prisma.company.findUnique({
      where: { subdomain },
    });

    if (existing) {
      // Company exists — add user as MANAGER
      await this.prisma.user.update({
        where: { id: user.id },
        data: { companyId: existing.id, role: 'MANAGER' },
      });

      return {
        company: existing,
        role: 'MANAGER',
      };
    }

    // Create new company — user becomes ADMIN
    const company = await this.prisma.company.create({
      data: {
        subdomain,
        oxToken: token,
        adminId: user.id,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { companyId: company.id, role: 'ADMIN' },
    });

    return {
      company,
      role: 'ADMIN',
    };
  }

  async deleteCompany(user: User, companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company.adminId !== user.id) {
      throw new ForbiddenException(
        'Only the admin who created the company can delete it',
      );
    }

    // Disconnect users from this company first
    await this.prisma.user.updateMany({
      where: { companyId },
      data: { companyId: null, role: 'MANAGER' },
    });

    await this.prisma.company.delete({ where: { id: companyId } });

    return { message: 'Company deleted' };
  }
}
