import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';
import { UserRole } from '../../domain/entities/user.entity';

export class UserResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
