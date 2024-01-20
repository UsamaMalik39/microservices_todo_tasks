import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from 'src/common/config/app.config';

@Module({
  imports: [MongooseModule.forRoot(MONGO_CONNECTION)],
})
export class DatabaseSchemaModule {}
