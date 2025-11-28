import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../domain/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'SecurePassword123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User role in the system',
    enum: UserRole,
    required: false,
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  role?: UserRole;
}
