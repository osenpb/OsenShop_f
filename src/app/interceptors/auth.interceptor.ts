
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(AuthService).token();


  if (token && !req.url.includes('/api/v1/auth/')) {
    req = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
  }

  return next(req);
}
