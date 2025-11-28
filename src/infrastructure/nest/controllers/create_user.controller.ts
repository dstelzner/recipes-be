import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/create-user.dto';
import { UserResponseDto } from 'src/application/dtos/user-response.dto';
import { CreateUserUseCase } from 'src/application/usecases/create_user.usecase';

@Controller()
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('users')
  async execute(@Body() body: CreateUserDto): Promise<UserResponseDto> {
    return await this.createUserUseCase.execute(body);
  }
}
