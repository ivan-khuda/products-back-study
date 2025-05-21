import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() dto: ProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  list() {
    return this.productsService.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.productsService.get(+id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productsService.patch(+id, dto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
