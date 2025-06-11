import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Variant])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
