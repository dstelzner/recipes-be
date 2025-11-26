// src/infrastructure/sequelize/repositories/recipe.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeModel } from '../models/recipe.model';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { Pagination } from 'src/domain/entities/pagination.entity';
import { User } from 'src/domain/entities/user.entity';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserRepository {
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
