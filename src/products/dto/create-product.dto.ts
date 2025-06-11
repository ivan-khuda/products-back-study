import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity';
import { Type } from 'class-transformer';
import { CreateVariantDto } from '../../variants/dto/create-variant.dto';

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  variants?: CreateVariantDto[];
}
