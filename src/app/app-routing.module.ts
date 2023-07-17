import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewPostComponent } from './pages/posts/view-post/view-post.component';
import { SinglePostViewComponent } from './pages/posts/view-post/single-post-view/single-post-view.component';
import { LoginComponent } from './pages/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth', children: [
      {
        path: 'login', pathMatch: 'full', component: LoginComponent
      }
    ]
  },
  {
    path: 'subreddit',
    children: [
      { path: ':subredditId', pathMatch: 'full', component: ViewPostComponent },
      {
        path: ':subredditId/post/:postId',
        pathMatch: 'full',
        component: SinglePostViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      errorHandler(error) {
        console.error('error ', error);
      },
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
