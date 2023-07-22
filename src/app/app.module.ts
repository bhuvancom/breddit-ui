import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppbarComponent } from './shared/appbar/appbar.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateComponent } from './pages/subreddit/create/create.component';
import { LoaderComponent } from './widgets/loader/loader.component';
import { ViewPostComponent } from './pages/posts/view-post/view-post.component';
import { SinglePostViewComponent } from './pages/posts/view-post/single-post-view/single-post-view.component';
import { CreatePostComponent } from './pages/posts/create/create-post/create-post.component';
import { TokenMiddleWare } from './middleware/token-middleware';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { OverlayComponent } from './shared/overlay/overlay.component';
import { SubredditComponent } from './widgets/subreddit/subreddit.component';
import { ErrorHandlerComponent } from './widgets/error-handler/error-handler.component';
import { InformerComponent } from './widgets/informer/informer.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { NavbarComponent } from './widgets/navbar/navbar.component';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { SidebarMenuComponent } from './widgets/sidebar-menu/sidebar-menu.component';
import { HomeSideViewComponent } from './widgets/home-side-view/home-side-view.component';
import { HomeCreatePostComponent } from './widgets/home-create-post/home-create-post.component';
import { PostCardComponent } from './widgets/post-card/post-card.component';
import { CommentCreateComponent } from './widgets/comment-create/comment-create.component';
import { CommentViewComponent, DialogContentExample } from './widgets/comment-view/comment-view.component';
import { UserDetailsComponent } from './pages/user/user-details/user-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AllSubrediitComponent } from './pages/all-subrediit/all-subrediit.component';
import { MyDatePipe } from './util/pipes/date.pipe';
import { VoteComponent } from './widget/vote/vote.component';
@NgModule({
  declarations: [
    MyDatePipe,
    DialogContentExample,
    AppComponent,
    AppbarComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent,
    LoaderComponent,
    ViewPostComponent,
    SinglePostViewComponent,
    CreatePostComponent,
    OverlayComponent,
    SubredditComponent,
    ErrorHandlerComponent,
    InformerComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    SidebarMenuComponent,
    HomeSideViewComponent,
    HomeCreatePostComponent,
    PostCardComponent,
    CommentCreateComponent,
    CommentViewComponent,
    UserDetailsComponent,
    NotFoundComponent,
    AllSubrediitComponent,
    VoteComponent,
  ],
  imports: [
    MaterialUiModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    EditorModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenMiddleWare,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  exports: [MyDatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
