import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfigService } from 'src/common/jwt-config.service';
import { User, UserSchema } from 'src/mongo/schemas/user.schema';
import { UserRepository } from 'src/repositories/user.repository';
import { TokenService } from './user/token.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [TokenService, UserService, UserRepository],
})
export class ApiModule {}
