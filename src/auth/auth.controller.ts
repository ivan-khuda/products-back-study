import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async singUp(@Body() signUpDto: SignUpDto): Promise<any> {
    console.log('signUpDto', signUpDto);
    return this.authService.singUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: LoginDto): Promise<any> {
    console.log('signInDto', signInDto);
    return await this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  async profile(@Req() req): Promise<any> {
    return req.user;
  }
}
