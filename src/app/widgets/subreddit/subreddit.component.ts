import { Component, Input, OnInit } from '@angular/core';
import DataState from 'src/app/models/data-state';
import Subreddit from 'src/app/models/subreddits';

@Component({
  selector: 'app-subreddit',
  templateUrl: './subreddit.component.html',
  styleUrls: ['./subreddit.component.scss']
})
export class SubredditComponent implements OnInit {
  @Input() subreddit: Subreddit | undefined;
  constructor() {

  }

  ngOnInit(): void {
  }

}
