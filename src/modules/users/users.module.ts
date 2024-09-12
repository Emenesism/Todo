import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptUtils } from 'src/common/utils/password.service';
import { UserRepository } from './repositories/user.repository';
import { AppLoggerService } from 'src/common/utils/logger.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, BcryptUtils, UserRepository, AppLoggerService],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
