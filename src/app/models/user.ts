import { PermissionLevel } from './permission-level';

export class User {
  userId: number;
  email: string;
  password: string;
  name: string;
  permissionLevel: PermissionLevel;

  constructor(
    userId: number,
    email: string,
    password: string,
    name: string,
    permissionLevel: PermissionLevel) {
      this.userId = userId;
      this.email = email;
      this.password = password;
      this.name = name;
      this.permissionLevel = permissionLevel;
  }
}
