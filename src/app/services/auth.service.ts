import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../auth/interfaces/user-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { RegisterRequest } from '../auth/interfaces/register-request.interface';
import { LoginRequest } from '../auth/interfaces/login-request.interface';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponse } from '../auth/interfaces/auth-response.interface';


type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';
  private http = inject(HttpClient);

  private _user = signal<UserResponse| null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string | null>(localStorage.getItem('token'));

  checkAuthStatusResource = rxResource({
    stream: () => this.checkAuthStatus(),
  })

  authStatus = computed(() => {
    if(this._authStatus() === 'checking') return 'checking';
    if(this._authStatus() === 'not-authenticated') return 'not-authenticated';
    return 'authenticated';
  });

  user = computed<UserResponse | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  register( registerRequest: RegisterRequest ) {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest) {
  return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest)
    .pipe(
      tap(resp => {
        const accessToken = resp.tokens.accessToken ;

        localStorage.setItem('token', accessToken); // luego puedo cambiarlo a accessToken
        localStorage.setItem('refreshToken', resp.tokens.refreshToken);

        this._token.set(accessToken);
        this._user.set(resp.userResponse);
        this._authStatus.set('authenticated');
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {

      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
      );
    }
    return throwError(() => new Error('Something bad happened'));
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No hay token, usuario no autenticado');
      this._authStatus.set('not-authenticated');
      return of(false);
    }

    console.log('Token encontrado, marcando usuario como autenticado.');
    this._token.set(token);
    this._authStatus.set('authenticated');

    return of(true);
  }

}
