import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  getDatabaseConfig() {
    return {
      dbPort: this.configService.get<number>('MYSQL_DB_PORT'),
      dbUsername: this.configService.get<string>('DB_USERNAME'),
      dbPassword: this.configService.get<string>('DB_PASSWORD'),
      dbDialect: this.configService.get<string>('DB_DIALECT'),
      dbHost: this.configService.get<string>('MYSQL_DB_HOST'),
      dbName: this.configService.get<string>('DB_NAME'),
    };
  }

  getJWTSecret(): number {
    return this.configService.get<number>('JWT_SECRET');
  }
}
