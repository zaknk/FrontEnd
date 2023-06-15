export class User {
  email: string;
  password: string;

  constructor(userId: number, email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
