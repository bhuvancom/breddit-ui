import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import AuthResponse from 'src/app/models/auth-response';
import { environment } from 'src/environments/environment';
import User from 'src/app/models/user';
import LoginReq from 'src/app/models/request/login-request';
import RegisterReq from 'src/app/models/request/register-req';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(registerReq: RegisterReq): Observable<any> {
    return this.http.post(`${environment.baseUrl}/auth/register`, registerReq);
  }
  public token: BehaviorSubject<string> = new BehaviorSubject('');
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private tokenKey = 'auth_token';
  public user?: BehaviorSubject<User>;
  login(loginReq: LoginReq): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.baseUrl}/auth/login`, loginReq)
      .pipe(
        tap((response) => {
          const token = response.authToken; // Assuming the JWT token is returned as 'token' in the response
          this.setToken(token);
          this.setuser(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.token.next('');
  }

  setToken(token: string): void {
    this.token.next(token);
    localStorage.setItem(this.tokenKey, token);
  }

  setuser(user: User) {
    this.user?.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | undefined {
    const u = localStorage.getItem('user');
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
  constructor(private http: HttpClient) {
    const user = this.getUser();
    const token = this.getToken();
    if (token) {
      this.setToken(token);
      if (user) {
        console.log('user logged in ', { user });
        this.user?.next(user);
      } else {
        this.setToken('');
      }
    }
  }
}
