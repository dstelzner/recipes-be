import { Inject } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcryptjs';

export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(userDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userDto.password, 10);

    const user = User.create({
      name: userDto.name,
      email: userDto.email,
      passwordHash,
      role: userDto.role,
    });

    const userFound = await this.userRepository.findById(user.id);

    const savedUser = userFound || (await this.userRepository.save(user));

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
