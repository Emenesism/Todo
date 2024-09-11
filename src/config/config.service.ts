import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get databaseConfig() {
    return {
      type: this.configService.get<
        'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mongodb'
      >('DB_DIALECT'),
      host: this.configService.get<string>('MYSQL_DB_HOST'),
      port: this.configService.get<number>('MYSQL_DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
    };
  }

  get serverPort() {
    return this.configService.get<string>('SERVER_PORT');
  }
}
