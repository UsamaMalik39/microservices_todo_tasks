import * as mongoose from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema()
export class Base {
  @Prop()
  createDate: number;

  @Prop()
  latsUdpatedDate: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  lastUpdatedBy: User;
}
