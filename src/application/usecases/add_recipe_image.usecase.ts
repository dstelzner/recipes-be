import { Inject } from '@nestjs/common';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';
import { ImageDto } from '../dtos/image.dto';

export class AddRecipeImageUseCase {
  constructor(
    @Inject('IRecipeRepository')
    private readonly recipeRepository: IRecipeRepository,
  ) {}

  async execute(recipeId: string, image: ImageDto) {
    const recipe = await this.recipeRepository.findById(recipeId);

    recipe.addImage(image.url, image.isThumbnail);

    return await this.recipeRepository.update(recipeId, recipe);
  }
}
