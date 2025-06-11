import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { WeightUnit } from '../entities/variant.entity';

export class CreateVariantDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  sku: string;

  @IsString()
  @IsOptional()
  barcode: string;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsString()
  @IsEnum(WeightUnit)
  weightUnit: WeightUnit = WeightUnit.KG;

  @IsNumber()
  @IsOptional()
  inventory: number;

  @IsString()
  @IsOptional()
  imageId: string;
}
