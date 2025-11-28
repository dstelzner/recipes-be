import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';

export class GetUserByIdUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
