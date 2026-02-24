import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { AdminOnly } from '../auth/decorators/admin-only.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { User } from '@prisma/client';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register-company')
  @UseGuards(JwtAuthGuard)
  registerCompany(
    @CurrentUser() user: User,
    @Body('subdomain') subdomain: string,
    @Body('token') token: string,
  ) {
    return this.companyService.registerCompany(user, subdomain, token);
  }

  @Delete('company/:id')
  @AdminOnly()
  deleteCompany(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.companyService.deleteCompany(user, id);
  }
}
