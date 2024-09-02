import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './services/interceptor/auth-interceptor';
import { provideAuth } from 'angular-auth-oidc-client';
import { authConfig } from './components/config/auth-config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideHttpClient(withInterceptors([authInterceptor])),
  provideToastr(),
  provideAnimations(),
  provideAuth(authConfig),

  ]
};
