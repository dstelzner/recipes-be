import { IsArray, IsInt } from 'class-validator';

export class PaginationDto<T> {
  @IsArray()
  items: T[];

  @IsInt()
  total: number;

  @IsInt()
  page: number;

  @IsInt()
  limit: number;

  @IsInt()
  totalPages: number;
}
