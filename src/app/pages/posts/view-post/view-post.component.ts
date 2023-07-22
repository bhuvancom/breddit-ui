import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import Post from 'src/app/models/post';
import Subreddit from 'src/app/models/subreddits';
import { AuthService } from 'src/app/services/auth/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';
import { dataTransformer } from 'src/app/util/data-transformer';
import { DialogContentExample } from 'src/app/widgets/comment-view/comment-view.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  constructor(
    private rpouter: Router,
    private postService: PostService,
    private subreServ: SubredditService,
    private activeRoute: ActivatedRoute,
    private authSer: AuthService,
    private _snak: MatSnackBar,
    public dialog: MatDialog,
    private overLaySer: OverlayService,
    private location: Location
  ) { }
  private postPage = 1;
  subredditId: string = '';
  subredditDetails: DataState<Subreddit> = new DataState();
  posts: DataState<ApiPagedResponse<Post>> = new DataState();
  ngOnInit(): void {
    this.activeRoute.params.subscribe((p) => {
      const id = p['subredditId'] ?? '';
      this.subredditId = id;
      this.fetchSubreddit();
      this.fetchNextPosts();
      this.subreServ.fetSubRedDetailsOfId(id).subscribe((r) => {
        this.subredditDetails = r;
      });
    });
  }

  fetchSubreddit = () => {
    this.subreServ.fetSubRedDetailsOfId(this.subredditId);
  };

  fetchNextPosts = () => {
    this.postService
      .fetchPostOfSubRed(this.subredditId, this.postPage)
      .subscribe((e) => {
        this.posts = dataTransformer(e, this.posts, () => {
          this.postPage++;
        });
      });
  };

  gotoCreatePost() {
    this.rpouter.navigate(['/create', 'post']);
  }
  editSubreddet = () => {
    this.rpouter.navigate(['/create', 'subreddit'], {
      queryParams: { id: this.subredditId },
    });
  };
  delete = false;
  deleteSubreddet() {
    const isLoggedIn = this.authSer.isLoggedIn.value;
    if (!isLoggedIn) {
      this._snak.open('You are not logged in', undefined, {
        duration: 2 * 1000,
      });
      return;
    }

    const dialogRef = this.dialog.open(DialogContentExample, {
      data: {
        delete: this.delete,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subreServ.deleteSubreddit(this.subredditId).subscribe((e) => {
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
  }
}
