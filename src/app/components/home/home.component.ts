import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from '../../service/auth/auth.service';
import { GlobalLoaderServiceService } from '../../service/loader/global-loader-service.service';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    SideMenuComponent,
    RouterOutlet,
    CommonModule,
    MatProgressBarModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @ViewChild('settingsTooltip') settingsTooltip!: MatTooltip;
  globalLoaderServiceService: GlobalLoaderServiceService;
  authService: AuthService;
  constructor(
    globalLoaderServiceService: GlobalLoaderServiceService,
    authService: AuthService,
    private oauthService: OAuthService
  ) {
    this.authService = authService;
    this.oauthService.configure(AuthService.AUTH_CODE_FLOW_CONFIG);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.globalLoaderServiceService = globalLoaderServiceService;
  }
  hideSettingsTooltip() {
    this.settingsTooltip.hide();
  }
}
