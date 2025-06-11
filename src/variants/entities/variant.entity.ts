import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

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

  @Column()
  weightUnit: string;

  @Column()
  inventory: number;

  @Column({ nullable: true })
  imageId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
