import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {
  @ApiPropertyOptional({
    description: 'Recipe title',
    example: 'Chocolate Cake',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Recipe summary',
    example: 'Delicious chocolate cake recipe',
  })
  @IsString()
  @IsOptional()
  summary?: string;

  @ApiPropertyOptional({
    description: 'Recipe ingredients',
    example: ['Flour', 'Milk', 'Eggs'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @ApiPropertyOptional({
    description: 'Recipe steps',
    example: ['Boil water', 'Put egg in a pan', 'Cook for 10 minutes'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  steps?: string[];

  @ApiPropertyOptional({
    description: 'Recipe images',
    type: [ImageDto],
    example: [
      {
        url: 'https://example.com/image.jpg',
        isThumbnail: false,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @ApiPropertyOptional({
    description: 'Recipe labels/tags',
    example: ['Healthy', 'Vegetarian'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
