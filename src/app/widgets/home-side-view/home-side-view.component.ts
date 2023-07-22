import { Component, OnInit } from '@angular/core';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import Subreddit from 'src/app/models/subreddits';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home-side-view',
  templateUrl: './home-side-view.component.html',
  styleUrls: ['./home-side-view.component.scss'],
})
export class HomeSideViewComponent implements OnInit {
  homePageSubreddits: DataState<ApiPagedResponse<Subreddit>>;
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
  constructor(private homeService: HomeService) {
    this.homePageSubreddits = new DataState();
  }

  fetchSubreddits = () => {
    this.homeService.fetchHomePageSubreddits();
  };
  ngOnInit(): void {
    const staticSub = this.homeService.homePageSubreddits.value;
    const shouldFetchSubreddits =
      !staticSub.error &&
      !staticSub.isLoading &&
      !staticSub.data?.content.length;
    if (shouldFetchSubreddits) {
      this.fetchSubreddits();
    }

    this.homeService.homePageSubreddits.subscribe(e => {
      this.homePageSubreddits = e;
    });
  }
}
