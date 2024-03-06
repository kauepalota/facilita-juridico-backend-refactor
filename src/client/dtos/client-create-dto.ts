import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClientCreateDto {
  @ApiProperty({
    description: 'The name of the client',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    description: 'The location of the client on the X axis',
    example: 1,
    required: true,
  })
  @IsNumber({ allowNaN: false }, { message: 'Location X must be a number' })
  locationX: number;

  @ApiProperty({
    description: 'The location of the client on the Y axis',
    example: 1,
    required: true,
  })
  @IsNumber({ allowNaN: false }, { message: 'Location Y must be a number' })
  locationY: number;
}
