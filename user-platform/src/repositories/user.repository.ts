import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/mongo/schemas/user.schema';
import { IUser } from 'src/repositories/model/user';

@Injectable()
export class UserRepository {
  private readonly SALT_ROUNDS = 10;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private getEncryptedPassword = (password: string): Promise<string> => {
    return bcrypt.hash(String(password), this.SALT_ROUNDS);
  };

  public async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  public async findOne(id: string): Promise<UserDocument> {
    const item = await this.userModel.findOne({ _id: id }).exec();
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  public async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email: email }).exec();
  }

  public async create(user: IUser): Promise<UserDocument> {
    user.password = await this.getEncryptedPassword(user.password);
    const createdItem = new this.userModel({ ...user, completed: false });
    return await createdItem.save();
  }

  public async update(id: string, user: IUser): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate({ _id: id }, user).exec();
  }

  public async isPasswordValid(
    user: IUser,
    givenPassword: string,
  ): Promise<boolean> {
    return user.active && bcrypt.compare(givenPassword, user.password);
  }
}
