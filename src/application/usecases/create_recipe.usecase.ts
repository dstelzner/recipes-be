import { Recipe } from 'src/domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';

export class CreateRecipeUseCase {
  constructor(private readonly recipeRepository: IRecipeRepository) {}

  async execute(recipeDto: CreateRecipeDto) {
    const recipe = Recipe.create({
      title: recipeDto.title,
      summary: recipeDto.summary,
      ingredients: recipeDto.ingredients,
      steps: recipeDto.steps,
      chefId: recipeDto.chefId,
      images: recipeDto.images,
      labels: recipeDto.labels,
    });

    return await this.recipeRepository.save(recipe);
  }
}
