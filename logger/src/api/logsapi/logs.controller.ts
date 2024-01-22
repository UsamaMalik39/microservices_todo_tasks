import { Controller, Logger } from '@nestjs/common';
import { LogsService } from './logs.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('logs')
export class LogsController {
    private readonly logger = new Logger(LogsController.name);

    constructor(private service: LogsService) {}
    
    @MessagePattern({ cmd: 'get_logs' })
    async get(data: { loggedInUser: any }) {
      this.logger.verbose('Request for get logs by id reveiced ...');
      return await this.service.get( data.loggedInUser);
    }
  
    
    @MessagePattern({ cmd: 'create_logs' })
    async addLog(data: { loggedInUser: any, log:any }) {
      this.logger.verbose('Request for get logs by id reveiced ...');
      return await this.service.addLog( data.loggedInUser,data.log);
    }
  
}
