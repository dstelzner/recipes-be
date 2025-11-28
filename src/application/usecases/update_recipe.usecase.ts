import { Inject } from '@nestjs/common';
import { Recipe } from 'src/domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { UpdateRecipeDto } from '../dtos/update-recipe.dto';

export class UpdateRecipeUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async execute(recipeId: string, recipe: UpdateRecipeDto) {
    const updatedRecipe = await this.recipeRepository.update(recipeId, recipe);

    return {
      id: updatedRecipe.id,
      title: updatedRecipe.title,
      summary: updatedRecipe.summary,
      ingredients: updatedRecipe.ingredients,
      steps: updatedRecipe.steps,
      chefId: updatedRecipe.chefId,
      images: updatedRecipe.images,
      labels: updatedRecipe.labels,
      createdAt: updatedRecipe.createdAt,
      updatedAt: updatedRecipe.updatedAt,
      chef: updatedRecipe.chef
        ? {
            id: updatedRecipe.chef.id,
            name: updatedRecipe.chef.name,
            email: updatedRecipe.chef.email,
            role: updatedRecipe.chef.role,
            createdAt: updatedRecipe.chef.createdAt,
            updatedAt: updatedRecipe.chef.updatedAt,
          }
        : null,
    };
  }
}
