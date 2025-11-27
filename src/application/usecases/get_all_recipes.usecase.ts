import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { RecipeFilterDto } from '../dtos/recipe-filter.dto';

export class GetAllRecipesUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(page?: number, limit?: number, filter?: RecipeFilterDto) {
    return await this.recipeRepository.findAll(page, limit, filter);
  }
}
