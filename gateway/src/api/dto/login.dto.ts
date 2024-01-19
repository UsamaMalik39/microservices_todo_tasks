import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  password: string;
}

export class LoginResponseDto {
  name: string;
  email: string;
  token: any;
}
