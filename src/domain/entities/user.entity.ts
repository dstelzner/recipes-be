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

  private validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }
}
