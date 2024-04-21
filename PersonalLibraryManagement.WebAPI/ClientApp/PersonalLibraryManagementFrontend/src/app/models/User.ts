export class User {
  private displayName: string;
  private password: string;
  private email: string;

  constructor(displayName: string, password: string, email: string) {
    this.displayName = displayName;
    this.password = password;
    this.email = email;
  }
}
