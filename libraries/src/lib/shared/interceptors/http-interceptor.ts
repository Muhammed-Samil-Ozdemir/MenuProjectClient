import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const endpoint = 'http://localhost:5110/';
  let clone = req.clone({
      url: url.replace('/api/', endpoint)
  });
  return next(clone);
};
