import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeDto } from 'src/application/dtos/create-recipe.dto';
import { CreateRecipeUseCase } from 'src/application/usecases/create_recipe.usecase';

@Controller()
export class CreateRecipeController {
  constructor(private readonly createRecipeUseCase: CreateRecipeUseCase) {}

  @Post('recipes')
  async execute(@Body() body: CreateRecipeDto) {
    return await this.createRecipeUseCase.execute(body);
  }
}
