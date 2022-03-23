import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // TODO: Use obsersable to get the value stored on StyleManagerService
  isDarkTheme = false;
  private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
