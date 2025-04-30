import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const products: CreateProductDto[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
  },
];

@Injectable()
export class ProductService {
  create(dto: CreateProductDto) {
    products.push(dto);
    return dto;
  }

  findAll() {
    return products;
  }

  findOne(id: string) {
    return products.find((product) => product.id === id);
  }

  update(id: string, dto: UpdateProductDto) {
    const product = products.find((p) => p.id === id);
    if (!product) return `Product with id ${id} not found`;
    return { ...product, ...dto };
  }

  remove(id: string) {
    const product = products.find((p) => p.id === id);
    if (!product) return `Product with id ${id} not found`;
    return products.filter((product) => product.id !== id);
  }
}
