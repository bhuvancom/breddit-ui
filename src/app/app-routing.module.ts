import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ViewPostComponent } from './pages/posts/view-post/view-post.component';
import { SinglePostViewComponent } from './pages/posts/view-post/single-post-view/single-post-view.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateComponent } from './pages/subreddit/create/create.component';
import { CreatePostComponent } from './pages/posts/create/create-post/create-post.component';
import { AuthService } from './services/auth/auth.service';
import {
  isUserLoggedInGaurd,
  isUserNotLoggedInGaurd,
} from './services/auth/auth.gaurd';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'auth',
    canActivate: [isUserNotLoggedInGaurd],
    children: [
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ],
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
  {
    path: 'user/:userId',
    component: UserDetailsComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    canActivate: [isUserLoggedInGaurd],

    children: [
      {
        path: 'subreddit',
        pathMatch: 'full',
        component: CreateComponent,
      },
      { path: 'post', pathMatch: 'full', component: CreatePostComponent },
    ],
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
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
