import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { OxApiModule } from '../ox-api/ox-api.module';

@Module({
  imports: [OxApiModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
