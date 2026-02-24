import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ManagerOnly } from '../auth/decorators/manager-only.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ManagerOnly()
  getProducts(
    @CurrentUser() user: any,
    @Query() query: GetProductsDto,
  ) {
    return this.productsService.getProducts(user, query.page, query.size);
  }
}
