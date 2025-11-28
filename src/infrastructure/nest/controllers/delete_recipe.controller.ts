import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteRecipeUseCase } from 'src/application/usecases/delete_recipe.usecase';

@Controller()
export class DeleteRecipeController {
  constructor(private readonly deleteRecipeUseCase: DeleteRecipeUseCase) {}

  @Delete('recipes/:id')
  async execute(@Param('id') id: string) {
    return await this.deleteRecipeUseCase.execute(id);
  }
}
