import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  static AUTH_CODE_FLOW_CONFIG: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: 'https://arnelyutiga.github.io/website/',
    clientId:
      '55632830734-98bub37osbhudj8eue634gcr0evs1oi6.apps.googleusercontent.com',
    scope: 'openid',
  };

  login() {
    this.oauthService.configure(AuthService.AUTH_CODE_FLOW_CONFIG);
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.initCodeFlow();
    });
  }

  getIdToken() {
    return this.oauthService.getIdToken();
  }

  isLoggedIn() {
    return this.oauthService.hasValidIdToken();
  }

  logout(): void {
    this.oauthService.logOut(true);
  }
}
