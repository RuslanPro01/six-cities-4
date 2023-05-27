import { User } from '../../types/user.js';
import typegoose, { defaultClasses, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { REGULAR_EXPRESSION } from '../../common/const.js';
import { createSha256 } from '../../common/utils.js';
import { injectable } from 'inversify';

const {prop} = typegoose;

export enum UserType {
  BASE = 'base',
  PRO = 'pro'
}

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
@injectable()
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: 1, maxlength: 15, default: ''})
  public name: string;
  @prop({required: true, match: REGULAR_EXPRESSION.CheckEmail, index: {unique: true}, default: ''})
  public eMail: string;
  @prop({minlength: 6, maxlength: 12, required: true, default: ''})
  private password?: string = '';
  @prop({match: REGULAR_EXPRESSION.CheckPhotoPath, default: 'https://api.dicebear.com/6.x/bots/svg'})
  public avatarUrl: string;
  @prop({enum: UserType, required: true})
  public userType: "base" | "pro";

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.eMail = userData.eMail;
    this.avatarUrl = userData.avatarUrl;
    this.userType = userData.userType
  }

  public setPassword(password: string, salt: string) {
    this.password = createSha256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity)
