import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/products.dto';

export interface Product extends ProductDto {
  productId: number;
  name: string;
  description: string;
  price: number;
  img?: string;
}

@Injectable()
export class ProductsService {
  products: Product[] = [
    {
      productId: 1,
      name: 'Product name 1',
      description: 'Product description 1',
      price: 1,
      img: '',
    },
    {
      productId: 2,
      name: 'Product name 2',
      description: 'Product description 2',
      price: 2,
      img: '',
    },
    {
      productId: 3,
      name: 'Product name 3',
      description: 'Product description 3',
      price: 3,
      img: '',
    },
  ];

  async create(data: ProductDto): Promise<Product> {
    const newProduct = {
      ...data,
      productId: this.products[this.products.length - 1].productId + 1,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async patch(uuid: number, data: ProductDto) {
    let newProduct;
    this.products = this.products.map((product) => {
      if (product.productId === uuid) {
        newProduct = { ...product, ...data };
        return newProduct;
      }
      return product;
    });
    return newProduct;
  }
  async remove(uuid: number) {
    this.products = this.products.filter(({ productId }) => productId !== uuid);
    return 'product removed';
  }

  async get(uuid: number) {
    return this.products.find(({ productId }) => productId === uuid);
  }

  async list() {
    return this.products;
  }
}
