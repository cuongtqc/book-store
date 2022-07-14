import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createConnection, Connection } from 'typeorm';
import { AppConfig } from '../common/constants/constants';

import { ConfigService } from '../common/services/config.service';
import { CommonModule } from '../common/common.module';
import { LoggerFactory } from '../common/services/logger.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      name: AppConfig.DB,
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mongodb',
          url: configService.db.url,
          entities: [__dirname + '/**/models/*.entity{.ts,.js}'],
          logging: true,
          synchronize: false,
          migrationsRun: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          migrations: [
            __dirname + '/**/migrations/*{.ts,.js}',
            __dirname + '/**/seedings/*{.ts,.js}',
          ],
          cli: {
            migrationsDir: 'src/database/migrations',
          },
        };
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  private readonly logger = LoggerFactory.create(this.constructor.name);

  public async runMigrations(configService: ConfigService) {
    const connection: Connection = await createConnection({
      type: 'postgres',
      url: configService.db.url,
    });
    this.logger.log('Start migration', connection.migrations);
    return connection.runMigrations({ transaction: 'each' });
  }
}
