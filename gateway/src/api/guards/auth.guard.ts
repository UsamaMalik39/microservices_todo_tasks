import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  HttpStatus,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGED_IN_USER } from '../../common/config/constant';
import { UserTokenDto } from '../dto/user.token.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  async validateRequest(request): Promise<boolean> {
    this.logger.verbose('The auth guard started...');
    const authHeader: string = request.headers.authorization;
    if (!authHeader) {
      return false;
    }
    try {
      this.logger.verbose('Request to user service sent...');
      const pattern = { cmd: 'verify_token' };
      const response: UserTokenDto = await this.userServiceClient
        .send(pattern, {
          token: authHeader.replace('Bearer', '').trim(),
        })
        .toPromise();
      this.logger.verbose('Response to user service received...');
      if (response.status == HttpStatus.OK) {
        request[LOGGED_IN_USER] = response.data;
        return true;
      }
      return false;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
    return true;
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }
}
