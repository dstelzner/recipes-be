import { Inject } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';

export class DeleteUserUseCase {
  constructor(@Inject('IUserRepository') private repository: IUserRepository) {}

  async execute(id: string) {
    return await this.repository.delete(id);
  }
}
