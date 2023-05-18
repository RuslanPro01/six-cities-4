import { config, DotenvParseOutput } from 'dotenv';
import { ConfigInterface, ConstEnv } from './config.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';

export default class ConfigService implements ConfigInterface {
  private readonly config: NodeJS.ProcessEnv;
  constructor(private logger: LoggerInterface) {
    const parsedOutput = config({path: './src/.env'});

    if (!parsedOutput.parsed) {
      this.logger.warn('Can\'t parse .env file');
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env parsed');
  }

  public get(constEnv: ConstEnv) {
    return this.config[constEnv];
  }
}
