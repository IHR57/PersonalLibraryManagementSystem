import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showMenu = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('PLMUserInfo');
    this.router.navigate(['/login']);
  }
}
