export class User {
  public id?: number;
  public username?: string;
  public password?: string;
  public listOfRoles?: Role[];
}

class Role {
  public id?: number;
  public roleName?: string;
}
