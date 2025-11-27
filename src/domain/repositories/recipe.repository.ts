import { Recipe } from '../entities/recipe.entity';
import { Pagination } from '../entities/pagination.entity';

export interface IRecipeRepository {
  save(recipe: Recipe): Promise<Recipe>;
  findAll(
    page?: number,
    limit?: number,
    filter?: { title?: string; label?: string; chefId?: string },
  ): Promise<Pagination<Recipe>>;
  update(id: string, recipe: Partial<Recipe>): Promise<Recipe>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Recipe>;
}
