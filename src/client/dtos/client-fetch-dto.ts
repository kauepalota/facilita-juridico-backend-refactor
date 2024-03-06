import { ApiProperty } from '@nestjs/swagger';

export class ClientFetchAllDto {
  @ApiProperty({
    description: 'If the response should be ordered by the minimal route',
    example: true,
    required: false,
  })
  routing: boolean;

  @ApiProperty({
    description: 'The maximum number of results to return',
    example: 10,
    required: false,
  })
  limit: number;
}
