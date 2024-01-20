import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from 'src/api/dto/login.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { UserTokenDto } from 'src/api/dto/user.token.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly tokenService: TokenService,
    private readonly userRepository: UserRepository,
  ) {}

  public async getAll(): Promise<UserDto[]> {
    this.logger.verbose('Request for get all users received...');
    return await this.userRepository.findAll();
  }

  public async get(id: string): Promise<UserDto> {
    return await this.userRepository.findOne(id);
  }

  public async create(model: UserDto): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(model.email);
    if (user) {
      throw new ConflictException('Email already avaliable');
    }
    return await this.userRepository.create(model);
  }

  public async update(id: string, model: UserDto): Promise<UserDto> {
    return await this.userRepository.update(id, model);
  }

  public async delete(id: string): Promise<UserDto> {
    const user = await this.get(id);
    user.active = false;
    return await this.userRepository.update(id, user);
  }

  public async login(model: LoginDto): Promise<UserTokenDto> {
    const user = await this.userRepository.findByEmail(model.email);
    if (!user) {
      throw new NotFoundException();
    }
    if (!(await this.userRepository.isPasswordValid(user, model.password))) {
      throw new UnauthorizedException();
    }
    return {
      name: user.name,
      email: user.email,
      token: this.tokenService.createToken(user),
    };
  }

  public async decodeToken(token: string): Promise<UserDto | null> {
    const data = await this.tokenService.decodeToken(token);
    if (!data) {
      return null;
    }
    const response = await this.userRepository.findByEmail(data.email);
    response.password = '<password>'; // remove password
    return response;
  }

  public async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}
