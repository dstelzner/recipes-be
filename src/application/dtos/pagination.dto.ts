import { IsArray, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto<T> {
  @ApiProperty({
    description: 'Array of items for the current page',
    isArray: true,
  })
  @IsArray()
  items: T[];

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  @IsInt()
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  @IsInt()
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @IsInt()
  limit: number;

  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  @IsInt()
  totalPages: number;
}
