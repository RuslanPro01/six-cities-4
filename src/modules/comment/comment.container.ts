import { Container } from 'inversify';
import { CommentEntity, CommentModel } from './comment.entity.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import CommentService from './comment-service.js';
import CommentController from './comment.controller.js';
import {ControllerInterface} from '../../core/controller/controller-interface.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<types.ModelType<CommentEntity>>(APPLICATION_DEPENDENCIES.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<CommentServiceInterface>(APPLICATION_DEPENDENCIES.CommentServiceInterface).to(CommentService).inSingletonScope();
  commentContainer.bind<ControllerInterface>(APPLICATION_DEPENDENCIES.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
