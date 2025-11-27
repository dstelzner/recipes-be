// src/infrastructure/sequelize/repositories/recipe.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { RecipeModel } from '../models/recipe.model';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { Pagination } from 'src/domain/entities/pagination.entity';
import { IRecipeRepository } from 'src/domain/repositories/recipe.repository';

@Injectable()
export class RecipeRepository implements IRecipeRepository {
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

  async findAll(
    page = 1,
    limit = 10,
    filter?: { title?: string; label?: string; chefId?: string },
  ): Promise<Pagination<Recipe>> {
    const offset = (page - 1) * limit;

    // Build dynamic where clause based on filters
    const where: any = {};

    if (filter?.title) {
      where.title = { [Op.like]: `%${filter.title}%` };
    }

    if (filter?.label) {
      where.labels = { [Op.contains]: [filter.label] };
    }

    if (filter?.chefId) {
      where.chefId = filter.chefId;
    }

    const { rows, count } = await this.model.findAndCountAll({
      where,
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

  async findById(id: string): Promise<Recipe> {
    const model = await this.model.findByPk(id);

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
}
