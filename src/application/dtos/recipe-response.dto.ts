import {
  IsArray,
  IsDate,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ImageDto } from './image.dto';
import { UserResponseDto } from './user-response.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeResponseDto {
  @ApiProperty({
    description: 'Recipe ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

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
    description: 'Chef details',
    type: () => UserResponseDto,
  })
  @ValidateNested()
  @Type(() => UserResponseDto)
  chef?: UserResponseDto;

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
  images: ImageDto[];

  @ApiProperty({
    description: 'Recipe labels/tags',
    example: ['Cake', 'Chocolate'],
  })
  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @ApiProperty({
    description: 'Creation date',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDate()
  updatedAt: Date;
}
