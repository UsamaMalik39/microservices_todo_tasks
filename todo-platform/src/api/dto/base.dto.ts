import { UserDto } from './user.dto';

export class BaseDto {
  createDate: number;
  latsUdpatedDate: number;
  lastUpdatedBy: UserDto;
}
