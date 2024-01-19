import { ApiProperty } from '@nestjs/swagger/dist';

export class CoOwnersRequestDto {
  @ApiProperty({
    required: true,
    type: [String],
  })
  emails: string[];
}
