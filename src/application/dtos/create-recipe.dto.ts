import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';
import { ImageDto } from './image.dto';

export class CreateRecipeDto {
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
  images?: ImageDto[];

  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
