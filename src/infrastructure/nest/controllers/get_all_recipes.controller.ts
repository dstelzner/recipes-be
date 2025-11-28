import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipeFilterDto } from 'src/application/dtos/recipe-filter.dto';
import { GetAllRecipesUseCase } from 'src/application/usecases/get_all_recipes.usecase';

@Controller()
export class GetAllRecipesController {
  constructor(private readonly getAllRecipesUseCase: GetAllRecipesUseCase) {}

  @Get('recipes/:page&:limit')
  async execute(
    @Query() query: RecipeFilterDto,
    @Param('page') page: number,
    @Param('limit') limit: number,
  ) {
    return await this.getAllRecipesUseCase.execute(page, limit);
  }
}
