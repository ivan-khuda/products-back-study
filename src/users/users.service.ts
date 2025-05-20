import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export type UserType = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    console.log('email eee', email);
    return this.userRepository.findOneBy({ email, isActive: true });
  }

  async remove(id: number): Promise<void> {
    this.userRepository.delete(id);
  }
}
