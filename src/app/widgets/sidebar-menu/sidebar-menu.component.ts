import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      name: 'Login',
    },
  ];
  constructor(private _router: Router) {}

  ngOnInit(): void {}
  openPath(path: string): void {
    console.log("clicked open ", path);
    
    this._router.navigate([path]);
  }
}
