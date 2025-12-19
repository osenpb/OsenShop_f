import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-layout-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

  private authService = inject(AuthService);

  isAuthenticated = this.authService.checkAuthStatusResource.value; // tamalcreo

    isUserMenuOpen = signal(false);

  toggleUserMenu() {
    this.isUserMenuOpen.update(v => !v);
  }

  closeUserMenu() {
    this.isUserMenuOpen.set(false);
  }

  logout() {
    //this.authService.logout(); // todavia no implementado
    this.closeUserMenu();
  }

}
