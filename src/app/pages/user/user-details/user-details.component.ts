import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import Post from 'src/app/models/post';
import Subreddit from 'src/app/models/subreddits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';
import { dataTransformer } from 'src/app/util/data-transformer';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  tabIndex = 0;
  postPageNo = 1;
  subredditPageNo = 1;
  username = '';
  noOfPost = 0;
  noOfSubreddits = 0;
  posts = new DataState<ApiPagedResponse<Post>>();
  subreddits = new DataState<ApiPagedResponse<Subreddit>>();

  constructor(
    private authSer: AuthService,
    private route: Router,
    private activatRoute: ActivatedRoute,
    private subServ: SubredditService,
    private postServ: PostService
  ) {
    this.activatRoute.params.subscribe((e) => {
      this.username = e['userId'] ?? '';
      this.fetchUserDetails();
    });
  }

  ngOnInit(): void { }

  fetchUserDetails = () => {
    this.fetchNextPosts();
    this.fetchNextSubReddits();
  };

  fetchNextPosts = () => {
    this.postServ
      .fetchPostByUserName(this.username, this.postPageNo)
      .subscribe((e) => {
        this.noOfPost = e.data?.totalElements ?? 0;
        this.posts = dataTransformer(e, this.posts, () => {
          this.postPageNo++;
        });
      });
  };
  fetchNextSubReddits = () => {
    this.subServ
      .findSubredditsByUser(this.username, this.subredditPageNo)
      .subscribe((e) => {
        this.noOfSubreddits = e.data?.totalElements ?? 0;
        this.subreddits = dataTransformer(e, this.subreddits, () => {
          this.subredditPageNo++;
        });
      });
  };
}
