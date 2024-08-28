import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { KeycloakService, KeycloakBearerInterceptor } from 'keycloak-angular';
import { initializeKeycloak } from './services/keycloak-init-factory';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideToastr(), provideAnimations(), {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakBearerInterceptor,
    multi: true
  },
    KeycloakService,
  provideHttpClient(withInterceptorsFromDi())]
};
