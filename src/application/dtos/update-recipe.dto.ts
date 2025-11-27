import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ImageDto } from './image.dto';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  summary?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ingredients?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  steps?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images?: ImageDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  labels?: string[];
}
