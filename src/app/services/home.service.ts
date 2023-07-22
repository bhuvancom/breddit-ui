import { Injectable } from '@angular/core';
import { APICall } from '../util/api-call';
import DataState from '../models/data-state';
import { BehaviorSubject } from 'rxjs';
import ApiPagedResponse from '../models/api-paged-response';
import Post from '../models/post';
import Subreddit from '../models/subreddits';
import { dataTransformer } from '../util/data-transformer';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public homePagePosts = new BehaviorSubject<DataState<ApiPagedResponse<Post>>>(new DataState());
  public homePageSubreddits = new BehaviorSubject<DataState<ApiPagedResponse<Subreddit>>>(new DataState());
  private currentHomePageNo = 1;
  public fetchHomePageData() {
    this.apiCall
      .apiCall<ApiPagedResponse<Post>>(
        'GET',
        '/home',
        { page: this.currentHomePageNo, pageSize: 10 },
        undefined
      )
      .subscribe((d) => {
        this.homePagePosts.next(dataTransformer(d, this.homePagePosts.value, () => {
          this.currentHomePageNo++;
        }));
      });
  }

  public fetchHomePageSubreddits() {
    this.apiCall
      .apiCall<ApiPagedResponse<Subreddit>>('GET', '/subreddit')
      .subscribe((d) => {
        this.homePageSubreddits.next(dataTransformer(
          d,
          this.homePageSubreddits.value,
          () => { }
        ));
      });
  }
  constructor(private apiCall: APICall) { }
}
