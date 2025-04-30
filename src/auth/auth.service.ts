import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(singInDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(singInDto.username);;
    if (!user || user.password !== singInDto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.userId, username: user.username };
    return { access_token: this.generateToken(payload) };
  }

  generateToken(payload: { sub: number; username: string }): string {
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
