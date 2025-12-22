import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-layout-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);


  isAuthenticated = this.authService.isAuthenticated; // tamalcreo
  user = this.authService.user; // esto trae el signal, si usara user() traeria el valor actual, x lo que no seria reactivo
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

  showUser() {
    if(!this.user()) console.log('no hay user');
    else{
      console.log(this.user()?.firstName);
    }
  }
}
