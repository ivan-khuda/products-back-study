import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<Variant> {
    const variant = this.variantRepository.create(createVariantDto);
    return this.variantRepository.save(variant);
  }

  async findAll(): Promise<Variant[]> {
    return this.variantRepository.find();
  }

  async findOne(id: number): Promise<Variant> {
    const variant = await this.variantRepository.findOne({ where: { id } });
    if (!variant) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
    return variant;
  }

  async update(
    id: number,
    updateVariantDto: UpdateVariantDto,
  ): Promise<Variant> {
    const variant = await this.findOne(id);
    const updated = this.variantRepository.merge(variant, updateVariantDto);
    return this.variantRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.variantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Variant with ID ${id} not found`);
    }
  }
}
