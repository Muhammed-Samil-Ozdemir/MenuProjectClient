import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../../libraries/src/lib/shared/interceptors/auth-interceptor';
import { httpInterceptor } from '../../../libraries/src/lib/shared/interceptors/http-interceptor';
import { errorInterceptor } from '../../../libraries/src/lib/shared/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([
      httpInterceptor,
      authInterceptor,
      errorInterceptor
    ])),
  ],
};
