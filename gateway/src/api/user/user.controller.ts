import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly service: UserService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all user details' })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async get(@Param('id') id: string) {
    return await this.service.get(id);
  }

  @Post()
  @ApiBody({
    type: UserDto,
  })
  @ApiOperation({ summary: 'Create user list' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() todo: UserDto) {
    return await this.service.create(todo);
  }

  @Put(':id')
  @ApiBody({
    type: UserDto,
  })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async update(@Param('id') id: string, @Body() todo: UserDto) {
    return await this.service.update(id, todo);
  }

  @Post('login')
  @ApiBody({
    type: LoginRequestDto,
  })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async login(@Body() model: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.service.login(model);
  }
}
