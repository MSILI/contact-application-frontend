import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../utils/app.const";
import {User} from "../model/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {TokenObject} from "../model/token-object.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private resourceUrl = `${API_URL}/account`;
  public authenticatedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authenticatedObs$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.authenticatedObs$ = this.authenticatedSubject$.asObservable();
  }

  public login(user: User): Observable<TokenObject> {
    return this.http.post<TokenObject>(`${this.resourceUrl}/login`, user);
  }

  public logout(): void {
    sessionStorage.clear();
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('tokenObject') ||
      !!sessionStorage.getItem('tokenObject')
    );
  }

  public isAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    return (
      !!currentUser &&
      !!currentUser.listOfRoles?.find((role) => role.roleName === 'ROLE_ADMIN')
    );
  }

  public getCurrentUser(): User | null {
    if (!!localStorage.getItem('tokenObject')) {
      return JSON.parse(String(localStorage.getItem('tokenObject'))).authenticatedUser;
    } else if (!!sessionStorage.getItem('tokenObject')) {
      return JSON.parse(String(sessionStorage.getItem('tokenObject'))).authenticatedUser;
    }
    return null;
  }
}
