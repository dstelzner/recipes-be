import { randomUUID } from 'crypto';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ paranoid: true })
export class RecipeModel extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: randomUUID() })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  summary: string;

  @Column({ type: DataType.JSON, allowNull: false })
  ingredients: string[];

  @Column({ type: DataType.JSON, allowNull: false })
  steps: string[];

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  chefId: string;

  @BelongsTo(() => UserModel)
  chef: UserModel;

  @Column({ type: DataType.DATE, allowNull: false })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;

  @Column({ type: DataType.JSON, allowNull: false })
  images: { url: string; isThumbnail: boolean }[];

  @Column({ type: DataType.JSON, allowNull: false })
  labels?: string[];
}
