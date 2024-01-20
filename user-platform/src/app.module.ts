import { Module } from '@nestjs/common';
import { DatabaseSchemaModule } from './mongo/database.schema.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DatabaseSchemaModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
