import { Inject } from '@nestjs/common';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { RecipeFilterDto } from '../dtos/recipe-filter.dto';

export class GetAllRecipesUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async execute(page?: number, limit?: number, filter?: RecipeFilterDto) {
    const result = await this.recipeRepository.findAll(page, limit, filter);

    const data = result.data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      chefId: recipe.chefId,
      images: recipe.images,
      labels: recipe.labels,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt,
      chef: recipe.chef
        ? {
            id: recipe.chef.id,
            name: recipe.chef.name,
            email: recipe.chef.email,
            role: recipe.chef.role,
            createdAt: recipe.chef.createdAt,
            updatedAt: recipe.chef.updatedAt,
          }
        : null,
    }));

    return {
      ...result,
      data,
    };
  }
}
