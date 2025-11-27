import {
  IsArray,
  IsDate,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';

export class RecipeResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  summary: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsUUID()
  chefId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @IsArray()
  @IsString({ each: true })
  labels: string[];

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
