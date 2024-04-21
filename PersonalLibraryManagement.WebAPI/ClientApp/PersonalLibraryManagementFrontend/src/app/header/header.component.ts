import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showMenu = false;
  isLoggedIn = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  logout(): void {
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    this.storageService.clean();

    window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }
}
