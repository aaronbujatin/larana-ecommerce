import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.href,
      });
      return false;
    }

    const requiredRoles = route.data['roles'] as Array<string>;

    if (requiredRoles && requiredRoles.some(role => this.keycloak.isUserInRole(role))) {
      return true; // User has one of the required roles
    } else {
      return this.router.parseUrl('/'); // Redirect to not authorized page
    }

  }



};
