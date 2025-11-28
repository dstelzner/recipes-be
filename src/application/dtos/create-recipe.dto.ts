import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ImageDto } from './image.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Recipe title',
    example: 'Chocolate Cake',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Recipe summary',
    example: 'Delicious chocolate cake recipe',
  })
  @IsString()
  summary: string;

  @ApiProperty({
    description: 'Recipe ingredients',
    example: ['Flour', 'Milk', 'Eggs'],
  })
  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @ApiProperty({
    description: 'Recipe steps',
    example: ['Boil water', 'Put egg in a pan', 'Cook for 10 minutes'],
  })
  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @ApiProperty({
    description: 'Chef ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  chefId: string;

  @ApiProperty({
    description: 'Recipe images',
    type: [ImageDto],
    example: [
      {
        url: 'https://example.com/image.jpg',
        isThumbnail: false,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @ApiProperty({
    description: 'Recipe labels/tags',
    example: ['Healthy', 'Vegetarian'],
  })
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
