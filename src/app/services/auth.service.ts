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

  private _user = signal<UserResponse | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string | null>(localStorage.getItem('token'));

  checkAuthStatusResource = rxResource({
    stream: () => this.checkAuthStatus(),
  });

  // Signal que devuelve el status como string
  authStatus = computed(() => this._authStatus());

  // Signal que devuelve boolean para usar en el template
  isAuthenticated = computed(() => this._authStatus() === 'authenticated');

  user = computed<UserResponse | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  register(registerRequest: RegisterRequest) {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap(resp => {
          console.log('Login exitoso, guardando datos:', resp);
          const accessToken = resp.tokens.accessToken;
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', resp.tokens.refreshToken);
          this._token.set(accessToken);
          this._user.set(resp.user);
          this._authStatus.set('authenticated');
          console.log('Usuario guardado:', this._user());
        }),
        catchError(this.handleError)
      );
  }

  // Para refrescar info del usuario
  me() {
    return this.http.get<UserResponse>(`${this.baseUrl}/me`)
      .pipe(
        tap((user: UserResponse) => {
          console.log('Usuario obtenido de /me:', user);
          this._user.set(user);
        }),
      );
  }

  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
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

  checkAuthStatus(): Observable<boolean | UserResponse> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token, usuario no autenticado');
      this._authStatus.set('not-authenticated');
      this._user.set(null);
      return of(false);
    }

    console.log('Token encontrado, verificando con backend...');
    this._token.set(token);

    // refresca el estado e info del usuario
    return this.me().pipe(
      tap(() => {
        this._authStatus.set('authenticated');
        console.log('Usuario autenticado correctamente');
      }),
      catchError(() => {
        console.log('Error al verificar token, cerrando sesión');
        this._authStatus.set('not-authenticated');
        this._user.set(null);
        localStorage.removeItem('token');
        return of(false);
      })
    );
  }
}
