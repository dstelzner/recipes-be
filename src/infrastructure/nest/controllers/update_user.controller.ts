import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateUserDto } from 'src/application/dtos/update-user.dto';
import { UserResponseDto } from 'src/application/dtos/user-response.dto';
import { UpdateUserUseCase } from 'src/application/usecases/update_user.usecase';

@Controller()
export class UpdateUserController {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

  @Put('users/:id')
  async execute(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.updateUserUseCase.execute(id, body);
  }
}
