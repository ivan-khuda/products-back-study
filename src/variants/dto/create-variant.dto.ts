import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsNumber()
  weight: number;

  @IsString()
  @IsNotEmpty()
  weightUnit: string;

  @IsNumber()
  inventory: number;

  @IsString()
  @IsNotEmpty()
  imageId: string;

  @IsNumber()
  productId: number;
}
