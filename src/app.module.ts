import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
