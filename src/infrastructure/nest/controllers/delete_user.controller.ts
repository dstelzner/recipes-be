import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteUserUseCase } from 'src/application/usecases/delete_user.usecase';

@Controller()
export class DeleteUserController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  @Delete('users/:id')
  async execute(@Param('id') id: string) {
    return await this.deleteUserUseCase.execute(id);
  }
}
