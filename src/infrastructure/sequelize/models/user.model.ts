import { randomUUID } from 'crypto';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRole } from 'src/domain/entities/user.entity';

@Table
export class UserModel extends Model {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: randomUUID() })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  role: UserRole;

  @Column({ type: DataType.STRING, allowNull: false })
  passwordHash: string;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: new Date() })
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: new Date() })
  updatedAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deletedAt: Date;
}
