import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Variant } from '../../variants/entities/variant.entity';

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 255,
  })
  title: string;

  @Column()
  body: string;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.DRAFT,
    nullable: false,
  })
  status: ProductStatus;

  @Column({
    nullable: true,
  })
  tags: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Variant, (variant) => variant.product, { cascade: true })
  variants: Variant[];
}
