// src/infrastructure/sequelize/repositories/recipe.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RecipeModel } from '../models/recipe.model';
import { UserModel } from '../models/user.model';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { User } from '../../../domain/entities/user.entity';
import { Pagination } from 'src/domain/entities/pagination.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
  constructor(@InjectModel(RecipeModel) private model: typeof RecipeModel) {}

  async save(recipe: Recipe): Promise<Recipe> {
    const model = await this.model.create({ ...recipe });
    const savedModel = await this.model.findByPk(model.id, {
      include: [UserModel],
    });

    return this.toEntity(savedModel);
  }

  async findAll(
    page = 1,
    limit = 10,
    filter?: { title?: string; labels?: string[]; chefId?: string },
  ): Promise<Pagination<Recipe>> {
    const offset = (page - 1) * limit;

    const where: any = {};

    if (filter?.title) {
      where.title = { [Op.like]: `%${filter.title}%` };
    }

    if (filter?.labels) {
      where.labels = { [Op.contains]: [filter.labels] };
    }

    if (filter?.chefId) {
      where.chefId = filter.chefId;
    }

    const { rows, count } = await this.model.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      include: [UserModel],
    });

    const items = rows.map((m) => this.toEntity(m));
    return Pagination.create(items, count, page, limit);
  }

  async update(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    await this.model.update({ ...recipe }, { where: { id } });

    const updated = await this.model.findByPk(id, { include: [UserModel] });

    return this.toEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async findById(id: string): Promise<Recipe> {
    const model = await this.model.findByPk(id, { include: [UserModel] });

    if (!model) return null;

    return this.toEntity(model);
  }

  private toEntity(model: RecipeModel): Recipe {
    const chef = model.chef
      ? new User(
          model.chef.id,
          model.chef.name,
          model.chef.email,
          model.chef.role,
          model.chef.passwordHash,
          model.chef.createdAt,
          model.chef.updatedAt,
        )
      : null;

    return new Recipe(
      model.id,
      model.title,
      model.summary,
      model.ingredients,
      model.steps,
      model.chefId,
      model.images,
      model.createdAt,
      model.updatedAt,
      model.labels,
      chef,
    );
  }
}
