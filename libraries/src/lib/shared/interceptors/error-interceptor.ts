import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { SKIP_ERROR_HANDLER } from '../services/http';
import { ErrorService } from '../services/error';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(SKIP_ERROR_HANDLER)){
    return next(req);
  }
  const error = inject(ErrorService);
  return next(req).pipe(
    catchError((err:HttpErrorResponse) => {
      error.handle(err);
      return of();
    })
  );
};
