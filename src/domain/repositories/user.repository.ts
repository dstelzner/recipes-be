import { User } from '../entities/user.entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findById(id: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
