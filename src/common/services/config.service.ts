import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';

export interface EnvConfig {
  [key: string]: string;
}

export interface AppConfig {
  port: number;
}

export interface DBConfig {
  url: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  url: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly validationScheme = {
    PORT: Joi.number().default(3000),

    REDIS_HOST: Joi.string(),
    REDIS_PORT: Joi.string(),

    DB_URL: Joi.string().required(),
  };

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get app(): AppConfig {
    return {
      port: Number(this.envConfig.PORT),
    };
  }

  get db(): DBConfig {
    return {
      url: String(this.envConfig.DB_URL),
    };
  }

  get redis(): RedisConfig {
    const url =
      'redis://' + this.envConfig.REDIS_HOST + ':' + this.envConfig.REDIS_PORT;
    return {
      host: String(this.envConfig.REDIS_HOST),
      port: Number(this.envConfig.REDIS_PORT),
      url,
    };
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const validation = envVarsSchema.validate(envConfig);
    return validation.value;
  }
}
