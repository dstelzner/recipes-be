import { Inject } from '@nestjs/common';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';

export class DeleteRecipeUseCase {
  constructor(
    @Inject('IRecipeRepository') private repository: IRecipeRepository,
  ) {}

  async execute(id: string) {
    return await this.repository.delete(id);
  }
}
