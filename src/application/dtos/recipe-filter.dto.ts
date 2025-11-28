import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RecipeFilterDto {
  @ApiPropertyOptional({
    description: 'Recipe title to filter by',
    example: 'Chocolate Cake',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Recipe labels/tags to filter by',
    example: ['Cake', 'Dessert'],
  })
  @IsOptional()
  @IsString()
  label?: string[];

  @ApiPropertyOptional({
    description: 'Chef ID to filter by',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  chefId?: string;
}
