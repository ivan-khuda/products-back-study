import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Variant } from '../variants/entities/variant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    await this.createDefaultVariant(product);
    return product;
  }

  async createDefaultVariant(product: Product) {
    const defaultVariant = this.variantRepository.create({
      title: 'Default',
      price: 0,
      sku: `SKU-${product.id}`,
      barcode: `BAR-${product.id}`,
      weight: 0,
      weightUnit: 'kg',
      inventory: 0,
      imageId: 'default-image',
      product,
    });

    return this.variantRepository.save(defaultVariant);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id },
        relations: ['variants'],
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    return this.productRepository.delete(id);
  }
}
