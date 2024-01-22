import { Injectable, Logger } from '@nestjs/common';
import { LogsRepository } from 'src/repositories/logs.repository';

@Injectable()
export class LogsService {
    private readonly logger = new Logger(LogsService.name);
    constructor(
      private readonly logsRepository: LogsRepository,
    ) {}
    public async get(loggedInUser: any){
        console.log('loggedInUser',loggedInUser)
        this.logger.verbose(`Request to get todo based on id received ...`);
        const dbRecord = await this.logsRepository.findAll();
        return dbRecord;
    }
    public async addLog(loggedInUser: any,log:any){
        const dbRecord = await this.logsRepository.create(log,loggedInUser);
        return dbRecord;
    }
}
