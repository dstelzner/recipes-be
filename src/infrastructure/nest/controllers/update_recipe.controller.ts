import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateRecipeDto } from 'src/application/dtos/update-recipe.dto';
import { UpdateRecipeUseCase } from 'src/application/usecases/update_recipe.usecase';

@Controller()
export class UpdateRecipeController {
  constructor(private readonly updateRecipeUseCase: UpdateRecipeUseCase) {}

  @Put('recipes/:id')
  async execute(@Param('id') id: string, @Body() body: UpdateRecipeDto) {
    return await this.updateRecipeUseCase.execute(id, body);
  }
}
