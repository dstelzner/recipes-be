// src/infrastructure/sequelize/repositories/recipe.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';
import { IUserRepository } from '../../../domain/repositories/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(UserModel) private model: typeof UserModel) {}

  async save(user: User): Promise<User> {
    const model = await this.model.create({ ...user });
    return new User(
      model.id,
      model.name,
      model.email,
      model.role,
      model.passwordHash,
      model.createdAt,
      model.updatedAt,
    );
  }

  async findById(id: string): Promise<User> {
    const model = await this.model.findByPk(id);
    return new User(
      model.id,
      model.name,
      model.email,
      model.role,
      model.passwordHash,
      model.createdAt,
      model.updatedAt,
    );
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.model.update({ ...user }, { where: { id } });

    const updated = await this.model.findByPk(id);

    return new User(
      updated.id,
      updated.name,
      updated.email,
      updated.role,
      updated.passwordHash,
      updated.createdAt,
      updated.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
