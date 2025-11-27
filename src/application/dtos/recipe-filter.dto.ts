import { IsOptional, IsString } from 'class-validator';

export class RecipeFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  chefId?: string;
}
