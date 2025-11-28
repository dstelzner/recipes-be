import { Controller, Get, Param } from '@nestjs/common';
import { UserResponseDto } from 'src/application/dtos/user-response.dto';
import { GetUserByIdUseCase } from 'src/application/usecases/get_user_by_id.usecase';

@Controller()
export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('users/:id')
  async execute(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.getUserByIdUseCase.execute(id);
  }
}
