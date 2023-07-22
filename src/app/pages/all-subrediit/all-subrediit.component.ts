import { Component, OnInit } from '@angular/core';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import Subreddit from 'src/app/models/subreddits';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-all-subrediit',
  templateUrl: './all-subrediit.component.html',
  styleUrls: ['./all-subrediit.component.scss'],
})
export class AllSubrediitComponent implements OnInit {
  subredditList: DataState<ApiPagedResponse<Subreddit>>;
  constructor(private subredServ: SubredditService) {
    this.subredditList = new DataState();
  }

  ngOnInit(): void {
    const snap = this.subredServ.subReddits.value;
    const shouldFetchNext =
      !snap.isLoading && !snap.error && (snap.data?.content?.length ?? 0) < 1;
    if (shouldFetchNext) this.fetchNext();
    
    this.subredServ.subReddits.subscribe((e) => {
      this.subredditList = e;
    });
  }

  fetchNext = () => {
    this.subredServ.fetchSubreddits();
  };
}
