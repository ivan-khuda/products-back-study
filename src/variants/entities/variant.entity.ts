import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

export enum WeightUnit {
  KG = 'kg',
  LB = 'lb',
  OZ = 'oz',
}

@Entity('variants')
export class Variant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  price: number;

  @Column()
  sku: string;

  @Column()
  barcode: string;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: WeightUnit,
    default: WeightUnit.KG,
    nullable: false,
  })
  weightUnit: WeightUnit;

  @Column()
  inventory: number;

  @Column()
  imageId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.variants)
  product: Product;
}
