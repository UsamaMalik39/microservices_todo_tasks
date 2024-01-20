import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './models/user';
import { Logs, LogsDocument } from 'src/mongo/schema/logs.schema';

@Injectable()
export class LogsRepository {
  constructor(@InjectModel(Logs.name) private logsModel: Model<LogsDocument>) {}

  public async findOne(loggedInUser:any): Promise<LogsDocument[]> {
    const item = await this.logsModel.find({ owner: loggedInUser }).exec();
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }


  public async create(
    item: any,
    loggedInUser: IUser,
  ): Promise<LogsDocument> {
    const createdItem = new this.logsModel({
      ...item,
      owner: loggedInUser,
      createDate: Date.now(),
      latsUdpatedDate: Date.now(),
      lastUpdatedBy: loggedInUser,
    });
    return await createdItem.save();
  }


}
