import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './base.schema';
import { User } from './user.schema';


export type LogsDocument = Logs & Document;

@Schema()
export class Logs extends Base {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

}

export const LogsSchema = SchemaFactory.createForClass(Logs);
