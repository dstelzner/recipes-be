import { Recipe } from 'src/domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { UpdateRecipeDto } from '../dtos/update-recipe.dto';

export class UpdateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(recipeId: string, recipe: UpdateRecipeDto) {
    return await this.recipeRepository.update(recipeId, recipe);
  }
}
