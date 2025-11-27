export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CHEF = 'CHEF',
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public role: UserRole = UserRole.USER,
    private passwordHash: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validateEmail();
  }

  static create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: UserRole;
  }): User {
    const { v5: uuidv5 } = require('uuid');
    return new User(
      uuidv5(data.email, uuidv5.DNS),
      data.name,
      data.email,
      data.role || UserRole.USER,
      data.passwordHash,
      new Date(),
      new Date(),
    );
  }

  private validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  changeRole(newRole: UserRole): void {
    this.role = newRole;
  }

  getPasswordHash(): string {
    return this.passwordHash;
  }
}
