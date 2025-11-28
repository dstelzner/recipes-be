import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ImageDto } from 'src/application/dtos/image.dto';
import { AddRecipeImageUseCase } from 'src/application/usecases/add_recipe_image.usecase';

@Controller()
export class AddRecipeImageController {
  constructor(private readonly addRecipeImageUseCase: AddRecipeImageUseCase) {}

  @Patch('recipes/:id/image')
  async execute(@Param('id') id: string, @Body() body: ImageDto) {
    return await this.addRecipeImageUseCase.execute(id, body);
  }
}
