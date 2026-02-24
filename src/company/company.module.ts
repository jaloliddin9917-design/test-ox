import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { OxApiModule } from '../ox-api/ox-api.module';

@Module({
  imports: [OxApiModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
