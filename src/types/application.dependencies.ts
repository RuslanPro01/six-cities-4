export const APPLICATION_DEPENDENCIES = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  RentalServiceInterface: Symbol.for('RentalServiceInterface'),
  RentalModel: Symbol.for('RentalModel'),
  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),
  RentalController: Symbol.for('RentalController'),
  RentalSpecialController: Symbol.for('RentalSpecialController'),
  UserController: Symbol.for('UserController'),
  CommentController: Symbol.for('CommentController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
} as const;
