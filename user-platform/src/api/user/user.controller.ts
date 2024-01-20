import { Body, Controller, HttpStatus, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from 'src/api/dto/login.dto';
import { TokenResponseDto } from 'src/api/dto/token.response.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { UserTokenDto } from 'src/api/dto/user.token.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) {}

  @MessagePattern({ cmd: 'get_all' })
  async getAll(): Promise<UserDto[]> {
    this.logger.verbose('Request for get all users received...');
    return await this.service.getAll();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  async get(data: { id: string }) {
    return await this.service.get(data.id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async create(@Body() data: { model: UserDto }) {
    return await this.service.create(data.model);
  }

  @MessagePattern({ cmd: 'udpate_user' })
  async update(data: { id; model }) {
    return await this.service.update(data.id, data.model);
  }

  @MessagePattern({ cmd: 'delete_user' })
  async delete(data: { id }) {
    return await this.service.delete(data.id);
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: { model: LoginDto }): Promise<UserTokenDto> {
    return await this.service.login(data.model);
  }

  @MessagePattern({ cmd: 'verify_token' })
  async decodeToken(data: { token: string }): Promise<TokenResponseDto> {
    this.logger.verbose('Receievd request for token verification ...');
    const tokenData = await this.service.decodeToken(data.token);
    return {
      status: tokenData ? HttpStatus.OK : HttpStatus.UNAUTHORIZED,
      message: tokenData ? 'token_decode_success' : 'token_decode_unauthorized',
      data: tokenData,
    };
  }

  @MessagePattern({ cmd: 'user_details' })
  async userBasedOnEmail(data: { email: string }): Promise<UserDto> {
    this.logger.verbose('Receievd request for get user by email ...');
    return await this.service.findByEmail(data.email);
  }
}
