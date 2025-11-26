// src/infrastructure/sequelize/repositories/recipe.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RecipeModel } from '../models/recipe.model';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { Pagination } from 'src/domain/entities/pagination.entity';

@Injectable()
export class RecipeRepository {
  constructor(@InjectModel(RecipeModel) private model: typeof RecipeModel) {}

  async save(recipe: Recipe): Promise<Recipe> {
    const model = await this.model.create({ ...recipe });
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
    );
  }

  async findAll(page = 1, limit = 10): Promise<Pagination<Recipe>> {
    const offset = (page - 1) * limit;

    const { rows, count } = await this.model.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    const items = rows.map(
      (m) =>
        new Recipe(
          m.id,
          m.title,
          m.summary,
          m.ingredients,
          m.steps,
          m.chefId,
          m.images,
          m.createdAt,
          m.updatedAt,
          m.labels,
        ),
    );
    return Pagination.create(items, count, page, limit);
  }

  async update(id: string, recipe: Partial<Recipe>): Promise<Recipe> {
    await this.model.update({ ...recipe }, { where: { id } });

    const updated = await this.model.findByPk(id);

    return new Recipe(
      updated.id,
      updated.title,
      updated.summary,
      updated.ingredients,
      updated.steps,
      updated.chefId,
      updated.images,
      updated.createdAt,
      updated.updatedAt,
      updated.labels,
    );
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}
