import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(),
    provideHttpClient(withInterceptors([ ApiInterceptor ])),
    provideRouter(routes), provideAnimationsAsync(),
  ]
};
