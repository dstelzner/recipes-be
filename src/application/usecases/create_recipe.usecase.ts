import { Inject } from '@nestjs/common';
import { Recipe } from 'src/domain/entities/recipe.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { CreateRecipeDto } from '../dtos/create-recipe.dto';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class CreateRecipeUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

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

    const user = await this.userRepository.findById(recipeDto.chefId);

    if (!user) {
      throw new Error('User not found');
    }

    const savedRecipe = await this.recipeRepository.save(recipe);

    return {
      id: savedRecipe.id,
      title: savedRecipe.title,
      summary: savedRecipe.summary,
      ingredients: savedRecipe.ingredients,
      steps: savedRecipe.steps,
      chefId: savedRecipe.chefId,
      images: savedRecipe.images,
      labels: savedRecipe.labels,
      createdAt: savedRecipe.createdAt,
      updatedAt: savedRecipe.updatedAt,
      chef: savedRecipe.chef
        ? {
            id: savedRecipe.chef.id,
            name: savedRecipe.chef.name,
            email: savedRecipe.chef.email,
            role: savedRecipe.chef.role,
            createdAt: savedRecipe.chef.createdAt,
            updatedAt: savedRecipe.chef.updatedAt,
          }
        : null,
    };
  }
}
