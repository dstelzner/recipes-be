import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RecipeModel } from './infrastructure/sequelize/models/recipe.model';
import { UserModel } from './infrastructure/sequelize/models/user.model';
import { CreateRecipeController } from './infrastructure/nest/controllers/create_recipe.controller';
import { CreateUserController } from './infrastructure/nest/controllers/create_user.controller';
import { DeleteRecipeController } from './infrastructure/nest/controllers/delete_recipe.controller';
import { DeleteUserController } from './infrastructure/nest/controllers/delete_user.controller';
import { GetAllRecipesController } from './infrastructure/nest/controllers/get_all_recipes.controller';
import { GetUserByIdController } from './infrastructure/nest/controllers/get_user_by_id.controller';
import { UpdateRecipeController } from './infrastructure/nest/controllers/update_recipe.controller';
import { UpdateUserController } from './infrastructure/nest/controllers/update_user.controller';

// Use Cases
import { CreateRecipeUseCase } from './application/usecases/create_recipe.usecase';
import { CreateUserUseCase } from './application/usecases/create_user.usecase';
import { DeleteRecipeUseCase } from './application/usecases/delete_recipe.usecase';
import { DeleteUserUseCase } from './application/usecases/delete_user.usecase';
import { GetAllRecipesUseCase } from './application/usecases/get_all_recipes.usecase';
import { GetUserByIdUseCase } from './application/usecases/get_user_by_id.usecase';
import { UpdateRecipeUseCase } from './application/usecases/update_recipe.usecase';
import { UpdateUserUseCase } from './application/usecases/update_user.usecase';
import { AddRecipeImageUseCase } from './application/usecases/add_recipe_image.usecase';

// Repositories
import { RecipeRepository } from './infrastructure/sequelize/repositories/recipe.repository';
import { UserRepository } from './infrastructure/sequelize/repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    SequelizeModule.forFeature([RecipeModel, UserModel]),
  ],
  controllers: [
    CreateRecipeController,
    CreateUserController,
    DeleteRecipeController,
    DeleteUserController,
    GetAllRecipesController,
    GetUserByIdController,
    UpdateRecipeController,
    UpdateUserController,
  ],
  providers: [
    CreateRecipeUseCase,
    CreateUserUseCase,
    DeleteRecipeUseCase,
    DeleteUserUseCase,
    GetAllRecipesUseCase,
    GetUserByIdUseCase,
    UpdateRecipeUseCase,
    UpdateUserUseCase,
    AddRecipeImageUseCase,
    {
      provide: 'IRecipeRepository',
      useClass: RecipeRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class AppModule {}
