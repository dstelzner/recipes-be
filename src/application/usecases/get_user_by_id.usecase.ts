import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserResponseDto } from '../dtos/user-response.dto';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDto> {
    return await this.userRepository.findById(id);
  }
}
