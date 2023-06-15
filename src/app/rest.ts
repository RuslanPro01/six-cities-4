import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../types/application.dependencies.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { DatabaseClientInterface } from '../core/databese-client/database-client.interface.js';
import { getUri } from '../common/db.js';
import express, { Express } from 'express';

@injectable()
export default class RestApplication {
  private expressApplication: Express;
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.ConfigService) private config: ConfigInterface<RestSchema>,
    @inject(APPLICATION_DEPENDENCIES.DatabaseClientInterface) private dbClient: DatabaseClientInterface
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    await this.dbClient.connect(getUri(
      this.config.get('DB_HOST'),
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    ));
  }

  private async _initServer() {
    this.logger.info('Init server');
    const port = this.config.get('APP_PORT');

    this.expressApplication.listen(port);

    this.logger.info(`🚀Server started on http://localhost:${port}/`);
  }

  public async init() {
    this.logger.info('Application init...');
    this.logger.info('Init database');
    await this._initDb();
    this.logger.info('Init database completed');
    await this._initServer();
  }
}
