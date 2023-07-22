import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import AuthResponse from 'src/app/models/auth-response';
import { environment } from 'src/environments/environment';
import User from 'src/app/models/user';
import LoginReq from 'src/app/models/request/login-request';
import RegisterReq from 'src/app/models/request/register-req';
import DataState from 'src/app/models/data-state';
import { APICall } from 'src/app/util/api-call';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(registerReq: RegisterReq): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/register`, registerReq);
  }
  findUser(userId: string): Observable<DataState<User>> {
    return this.apicaller.apiCall("GET", "/user/" + userId);
  }
  public token: BehaviorSubject<string> = new BehaviorSubject('');
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private tokenKey = 'auth_token';
  public user: BehaviorSubject<User> | undefined;
  login(loginReq: LoginReq): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, loginReq)
      .pipe(
        tap((response) => {
          const token = response.authToken; // Assuming the JWT token is returned as 'token' in the response
          this.setToken(token);
          this.setuser(response.user);
          this.isLoggedIn.next(token.length > 0 && (response.user !== undefined));
        })
      );
  }
  private userKey = "user_key";
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isLoggedIn.next(false);
    this.token.next('');
  }

  setToken(token: string): void {
    this.token.next(token);
    localStorage.setItem(this.tokenKey, token);
  }

  setuser(user: User) {
    this.user = new BehaviorSubject(user);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | undefined {
    const u = localStorage.getItem(this.userKey);
    console.log('user is ', { u });
    if (u) {
      let user = JSON.parse(u);
      return user;
    }
    return;
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey) ?? this.token.getValue();
  }
  constructor(private http: HttpClient, private apicaller: APICall) {
    const user = this.getUser();
    const token = this.getToken();

    if (token) {
      this.setToken(token);
      if (user) {
        console.log('user logged in ', { user });
        this.user = new BehaviorSubject(user);
        this.isLoggedIn.next(true);
      } else {
        this.logout();
      }
    }
  }
}
