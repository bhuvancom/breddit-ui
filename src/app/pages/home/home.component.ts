import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import defaultPagedData from 'src/app/models/default-paged-data';
import Post from 'src/app/models/post';
import Subreddit from 'src/app/models/subreddits';
import { HomeService } from 'src/app/services/home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  homePagePosts: DataState<ApiPagedResponse<Post>>;
  constructor(
    private homeService: HomeService,
    private _router: Router
  ) {
    const def = defaultPagedData<Subreddit>();
    this.homePagePosts = new DataState();
  }
  ngOnInit(): void {
    const staticHopePageData = this.homeService.homePagePosts.getValue();
    console.log(staticHopePageData);

    const souldFetch =
      !staticHopePageData.error &&
      !staticHopePageData.isLoading &&
      !staticHopePageData.data?.content.length;
    console.log('shoud fetch ', { souldFetch });

    if (souldFetch) {
      this.fetchNext();
    }

    this.homeService.homePagePosts.subscribe((data) => {
      this.homePagePosts = data;      
    });
  }

  fetchNext = () => {
    console.log('fetch next is');

    this.homeService.fetchHomePageData();
  };
}
