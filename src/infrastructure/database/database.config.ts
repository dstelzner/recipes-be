import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { RecipeModel } from '../sequelize/models/recipe.model';
import { UserModel } from '../sequelize/models/user.model';

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || './database.sqlite',
  models: [UserModel, RecipeModel],
  autoLoadModels: true,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};
