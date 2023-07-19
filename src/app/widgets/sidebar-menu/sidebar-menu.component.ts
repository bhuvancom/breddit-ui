import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
type Route = {
  path: string;
  icon: string | undefined;
  onClick: () => void | undefined;
  name: string;
};
@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent implements OnInit {
  ROUTES: Route[] = [
    {
      icon: 'login',
      onClick: () => {
        console.log('clicked login');
      },
      path: '/auth/login',
      name: 'Login',
    },
    {
      icon: 'pencil',
      onClick: () => {
        console.log('clicked');
      },
      path: '/create/subreddit',
      name: 'Create a subreddit',
    },
    {
      icon: 'pencil',
      onClick: () => {
        console.log('pencil clicked post');
      },
      path: '/create/post',
      name: 'Create a post',
    },
  ];
  constructor(private _router: Router, private authService: AuthService) {
    authService.token.subscribe({
      next: (token) => {
        this.isLoggedIn =
          token.trim().length > 0 && authService.user?.getValue() !== null;
        if (this.isLoggedIn) {
          const user = authService.getUser();
          if (user) {
            this.user = user;
          }
          this.ROUTES = this.ROUTES.filter(e => e.name !== 'Login');
        }
      },
    })


    this.user = {
      email:'akash',
      userId:1,
      username:'bhuvancom'
    }
  }

  user?: User;
  logout(){
    this.authService.logout();
    this._router.navigate(['/']);
  }
  isLoggedIn: boolean = false;

  ngOnInit(): void { }
  openPath(path: string): void {
    console.log("clicked open ", path);

    this._router.navigate([path]);
  }
}
