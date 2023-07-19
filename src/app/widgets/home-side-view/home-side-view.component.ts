import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-side-view',
  templateUrl: './home-side-view.component.html',
  styleUrls: ['./home-side-view.component.scss'],
})
export class HomeSideViewComponent implements OnInit {
  sideRoutes = [
    {
      path: '/pages/privacy',
      name: 'Privacy Policy',
    },
    {
      path: '/pages/privacy',
      name: 'Privacy Policy',
    },
    {
      path: '/pages/privacy',
      name: 'Privacy Policy',
    },
    {
      path: '/pages/privacy',
      name: 'Privacy Policy',
    },
    {
      path: '/pages/privacy',
      name: 'Privacy Policy',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
