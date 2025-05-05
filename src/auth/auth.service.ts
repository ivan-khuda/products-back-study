import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { QueryFailedError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    console.log('email', email);
    console.log('password', password);
    const user = await this.usersService.findOne(email);
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    console.log('isPasswordCorrect', isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }

  async singUp(signUpDto: SignUpDto): Promise<any> {
    const { firstName, lastName, email, password, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new UnprocessableEntityException('Passwords do not match');
    }

    // const saltOrRounds = 10;
    const salt = await bcrypt.genSalt();
    console.log('salt', salt);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
      const user = await this.usersService.create({
        firstName,
        lastName,
        email,
        passwordHash,
        isActive: true,
      });
      return {
        id: user.id,
      };
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if (error.driverError.code === '23505') {
          throw new UnprocessableEntityException(
            'User with this email already exists.',
          );
        }
      }
      throw new UnprocessableEntityException('Filed to create user.');
    }
  }

  generateToken(payload: { sub: number; username: string }): string {
    console.log('payload', payload);
    console.log('process.env', process.env);
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
  }
}
