import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { BcryptUtils } from 'src/common/utils/password.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '48h' },
    }),
    UsersModule,
  ],
  providers: [AuthService, UsersService, BcryptUtils],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
