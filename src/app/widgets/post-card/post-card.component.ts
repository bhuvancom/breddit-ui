import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Post from 'src/app/models/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input('post') post!: Post;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openPost() {
    // TODO open subreddit details page
    this.router.navigate(['subreddit', 1, 'post',1]);
  }
}
