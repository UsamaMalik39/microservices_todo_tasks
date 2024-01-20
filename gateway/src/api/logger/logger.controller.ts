import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import {
    Controller,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import { AuthGuard } from '../guards/auth.guard';
import { LoggerService } from './logger.service';
  
  @Controller('logger')
  @ApiTags('logger')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  export class LoggerController {
    constructor(private service: LoggerService) {}
  
    @Get('')
    @ApiOperation({ summary: 'Get All Logs' })
    @ApiResponse({
      status: 200,
      description: 'The record has been successfully retrieved.',
    })
    @ApiResponse({ status: 404, description: 'The logs were not found.' })
    async getAll() {
      return await this.service.get();
    }

  }
  