import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Post from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input('post') post?: Post;
  @Input() id: string = '0';
  constructor(
    private router: Router,
    private auth: AuthService,
    private _snackBar: MatSnackBar,
    private voteSer: VoteService,
    private overlaySer: OverlayService
  ) { }

  ngOnInit(): void { }

  openPost() {
    this.router.navigate([
      '/subreddit',
      this.id,
      'post',
      this.post?.postId,
    ]);
  }

  openSnackbar(msg: string) {
    const ref = this._snackBar.open('Please login to ' + msg, 'Login', {
      duration: 5 * 1000,
    });
    ref.onAction().subscribe(() => {
      this.router.navigate(['/auth', 'login']);
    });
  }

  downVote = () => {
    if (!this.auth.isLoggedIn.value) {
      this.openSnackbar('downvote');
      return;
    }
    if (!this.post?.postId) return;

    this.voteSer
      .vote({ voteType: 'DOWNVOTE' }, this.post.postId.toString())
      .subscribe((e) => {
        this.overlaySer.setIsLoading(e.isLoading);
        if (e.error.length > 0) {
          this._snackBar.open('Downvote failed ' + e.error, undefined, {
            duration: 2 * 1000,
          });
        } else if (!e.isLoading) {
          if (this.post) {
            if (this.post.myUpVote) {
              this.post!.voteCount -= 2;
            } else {
              this.post!.voteCount -= 1;
            }
            this.post.myDownVote = true;
            this.post.myUpVote = false;
          }
        }
      });
  };

  upvote = () => {
    if (!this.auth.isLoggedIn.value) {
      this.openSnackbar('upvote');
      return;
    }
    if (!this.post?.postId) return;

    this.voteSer
      .vote({ voteType: 'UPVOTE' }, this.post.postId.toString())
      .subscribe((e) => {
        this.overlaySer.setIsLoading(e.isLoading);
        if (e.error.length > 0) {
          this._snackBar.open('Upvote failed ' + e.error, undefined, {
            duration: 2 * 1000,
          });
        } else if (!e.isLoading) {
          if (this.post) {
            if (this.post.myDownVote) {
              this.post!.voteCount += 2;
            } else {
              this.post!.voteCount += 1;
            }
            this.post.myUpVote = true;
            this.post.myDownVote = false;
          }
        }
      });
  };
}
