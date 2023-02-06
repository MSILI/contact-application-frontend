import {User} from "./user.model";

export class TokenObject {
  token?: string;
  tokenType?: string;
  authenticatedUser?: User;
}
