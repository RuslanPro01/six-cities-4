import {Request, Response} from 'express';
import {inject, injectable} from 'inversify';
import {StatusCodes} from 'http-status-codes';

import ControllerAbstract from '../../core/controller/controller-abstract.js';
import {APPLICATION_DEPENDENCIES} from '../../types/application.dependencies.js';
import {LoggerInterface} from '../../core/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.js';
import {CommentServiceInterface} from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import {RentalServiceInterface} from '../rental/rental-service.interface.js';
import HttpError from '../../core/errors/http-error.js';
import {fillDto} from '../../common/utils.js';
import CommentRdo from './rdo/comment.rdo.js';


@injectable()
export default class CommentController extends ControllerAbstract {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) protected logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.CommentServiceInterface) private commentService: CommentServiceInterface,
    @inject(APPLICATION_DEPENDENCIES.RentalServiceInterface) private rentalService: RentalServiceInterface,
  ) {
    super(logger);
    this.logger.info('Register route for CommentController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      next: this.create,
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateCommentDto>,
    res: Response,
  ) {
    if (!await this.rentalService.exist(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        `CommentController`,
      )
    }

    const comment = await this.commentService.createComment(body);
    await this.rentalService.incCommentCount(body.offerId);
    // Добавить перерасчет рейтинга по аналогии с this.rentalService.incCommentCount
    this.created(res, fillDto(CommentRdo, comment));
  }
}
