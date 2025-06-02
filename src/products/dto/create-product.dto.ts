import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  body: string;

  @IsString()
  @IsOptional()
  tags: string;

  @IsEnum(ProductStatus)
  @IsOptional()
  status: ProductStatus = ProductStatus.DRAFT;
}
