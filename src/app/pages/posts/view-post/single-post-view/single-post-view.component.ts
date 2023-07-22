import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import { Comment } from 'src/app/models/comment';
import DataState from 'src/app/models/data-state';
import Post from 'src/app/models/post';
import { CommetnReq } from 'src/app/models/request/comment-req';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PostService } from 'src/app/services/post.service';
import { VoteService } from 'src/app/services/vote.service';
import { dataTransformer } from 'src/app/util/data-transformer';
import { DialogContentExample } from 'src/app/widgets/comment-view/comment-view.component';

@Component({
  selector: 'app-single-post-view',
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.scss'],
})
export class SinglePostViewComponent implements OnInit {
  postId: string = '';
  subredditId = '';
  postDetails: DataState<Post> = new DataState();
  commentPage = 1;

  comments = new DataState<ApiPagedResponse<Comment>>();
  post: DataState<Post> = new DataState();
  user: User | undefined;
  isLoggedIn = false;
  constructor(
    private postSer: PostService,
    private commSer: CommentService,
    private activeRoute: ActivatedRoute,
    private _snak: MatSnackBar,
    private overlaySer: OverlayService,
    private auhSer: AuthService,
    private router: Router,
    private voteSer: VoteService,
    private overLaySer: OverlayService,
    private location: Location,
    public dialog: MatDialog
  ) {
    this.activeRoute.params.subscribe((e) => {
      this.postId = e['postId'] ?? '';
      this.subredditId = e['subredditId'] ?? '';
      this.fetchPost();
    });
  }

  editPost = () => {
    this.router.navigate(['/create/post'], { queryParams: { id: this.postId } });
  }
  deletePost = () => {
    const isLoggedIn = this.auhSer.isLoggedIn.value;
    if (!isLoggedIn) {
      this._snak.open('You are not logged in', undefined, {
        duration: 2 * 1000,
      });
      return;
    }

    const dialogRef = this.dialog.open(DialogContentExample, {
      data: {
        delete: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postSer
          .deletePost(this.subredditId, this.postId)
          .subscribe((e) => {
            this.overLaySer.setIsLoading(e.isLoading);
            if (e.error.length > 0) {
              this._snak.open('Delete failed ' + e.error, undefined, {
                duration: 2 * 1000,
              });
            } else if (!e.isLoading) {
              this._snak.open('Deleted ' + e.error, undefined, {
                duration: 2 * 1000,
              });
              this.location.back();
            }
          });
      }
    });
  };

  fetchPost = () => {
    this.postSer
      .fetchPostByPostAndSubRedditId(this.postId, this.subredditId)
      .subscribe((d) => {
        this.post = d;
        if (d.data) this.fetchNextComments();
      });
  };

  onSubmitComment = (cmnt: string, onSuccess: () => void) => {
    if (cmnt.length < 1) {
      this._snak.open('Please write commetn text', undefined, {
        duration: 2 * 1000,
      });
      return;
    }
    const comment: CommetnReq = {
      commentText: cmnt,
    };

    this.commSer.postComment(this.postId, comment).subscribe((e) => {
      this.overlaySer.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this._snak.open('Comment add failed ' + e.error, undefined, {
          duration: 2 * 1000,
        });
      } else if (e.data) {
        onSuccess();
        this.onRefresh('Comment added');
      }
    });
  };

  onCommentDelete = (comId: string) => {
    this.commSer.deleteComment(comId).subscribe((e) => {
      this.overlaySer.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this._snak.open('Delete failed ' + e.error, undefined, {
          duration: 2 * 1000,
        });
      } else if (!e.isLoading) {
        this.onRefresh('Deleted');
      }
    });
  };

  onRefresh = (msg: string) => {
    this._snak.open(msg, undefined, {
      duration: 2 * 1000,
    });
    this.commentPage = 1;
    this.post = new DataState();
    this.comments = new DataState();
    this.fetchPost();
  };

  fetchNextComments = () => {
    if (this.post.isLoading) return;
    this.commSer.fetchComment(this.postId, this.commentPage).subscribe((d) => {
      this.comments = dataTransformer(d, this.comments, () => {
        this.commentPage++;
      });
    });
  };

  ngOnInit(): void {
    this.auhSer.isLoggedIn.subscribe((e) => {
      this.isLoggedIn = e;
      if (e) {
        this.user = this.auhSer.getUser();
      }
    });
  }

  openSnackbar(msg: string) {
    const ref = this._snak.open('Please login to ' + msg, 'Login', {
      duration: 5 * 1000,
    });
    ref.onAction().subscribe(() => {
      this.router.navigate(['/auth', 'login']);
    });
  }

  downVote = () => {
    if (!this.auhSer.isLoggedIn.value) {
      this.openSnackbar('downvote');
      return;
    }
    this.voteSer.vote({ voteType: 'DOWNVOTE' }, this.postId).subscribe((e) => {
      this.overlaySer.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this._snak.open('Downvote failed ' + e.error, undefined, {
          duration: 2 * 1000,
        });
      } else if (!e.isLoading) {
        this.onRefresh('Downvoted');
      }
    });
  };

  upvote = () => {
    if (!this.auhSer.isLoggedIn.value) {
      this.openSnackbar('upvote');
      return;
    }

    this.voteSer.vote({ voteType: 'UPVOTE' }, this.postId).subscribe((e) => {
      this.overlaySer.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this._snak.open('Upvote failed ' + e.error, undefined, {
          duration: 2 * 1000,
        });
      } else if (!e.isLoading) {
        this.onRefresh('Upvoted');
      }
    });
  };
}
