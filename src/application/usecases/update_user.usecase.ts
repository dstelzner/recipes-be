import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, user: UpdateUserDto) {
    return await this.userRepository.update(id, user);
  }
}
