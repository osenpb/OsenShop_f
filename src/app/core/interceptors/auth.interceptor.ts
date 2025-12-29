
import { inject } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const token = authService.token();

  // Endpoints que NO requieren token
  const publicEndpoints = [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/auth/refresh-token'
  ];

  const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint));

  // Agrega el token a todas las peticiones EXCEPTO las públicas
  if (token && !isPublicEndpoint) {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
  }

  return next(req);
}
