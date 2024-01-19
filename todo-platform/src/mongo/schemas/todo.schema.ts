import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './base.schema';
import { User } from './user.schema';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo extends Base {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop()
  status: string;

  @Prop()
  active: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
