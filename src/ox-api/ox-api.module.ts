import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OxApiService } from './ox-api.service';

@Module({
  imports: [HttpModule],
  providers: [OxApiService],
  exports: [OxApiService],
})
export class OxApiModule {}
