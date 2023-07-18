import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/themes/theme.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import AuthResponse from 'src/app/models/auth-response';
import User from 'src/app/models/user';
import { Router } from '@angular/router';

declare const $: any;
@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
})
export class AppbarComponent implements OnInit {
  @Input() sideNavState!: boolean;
  @Input() toggleSidebarHandler!: () => void;

  isDark: boolean = false;
  isLoggedIn: boolean = false;
  user: User | undefined;
  showExtendedBar: boolean = false;
  isMobile = false;

  constructor(
    private themeService: ThemeService,
    private _renderer: Renderer2,
    private authService: AuthService,
    private router: Router
  ) {
    themeService.currentTheme.subscribe((value) => {
      this.isDark = value === 'dark';
      if (this.isDark) {
        this._renderer.addClass(document.body, 'dark-theme');
        this._renderer.removeClass(document.body, 'light-theme');
      } else {
        this._renderer.addClass(document.body, 'light-theme');
        this._renderer.removeClass(document.body, 'dark-theme');
      }
    });
    authService.token.subscribe((token) => {
      this.isLoggedIn =
        token.trim().length > 0 && authService.user?.getValue() !== null;
      if (this.isLoggedIn) {
        const user = authService.getUser();
        if (user) {
          this.user = user;
        }
      }
    });
  }

  toggleSidebar() {
    this.toggleSidebarHandler();
  }
  handleWidthChange() {
    const width = $(window).width();
    if (width < 960) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  handleChange() {
    $(document).ready(() => {
      this.handleWidthChange();
    });

    // Attach the resize event handler
    $(window).resize(() => {
      this.handleWidthChange();
    });
  }

  isMobileMenu() {
    if ($(window).width() > 960) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    this.handleChange();
  }
  login() {
    this.router.navigate(['auth', 'login']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
