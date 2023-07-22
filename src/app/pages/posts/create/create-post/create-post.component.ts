import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import ApiPagedResponse from 'src/app/models/api-paged-response';
import DataState from 'src/app/models/data-state';
import PostReq from 'src/app/models/request/post-req';
import Subreddit from 'src/app/models/subreddits';
import { OverlayService } from 'src/app/services/overlay.service';
import { PostService } from 'src/app/services/post.service';
import { SubredditService } from 'src/app/services/subreddit.service';
import { dataTransformer } from 'src/app/util/data-transformer';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postName = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  subredditName = new FormControl('', [Validators.required]);
  description = new FormControl<string>('', [Validators.required]);
  subreddits = new DataState<ApiPagedResponse<Subreddit>>();
  editMode = false;
  editPostId = '';
  constructor(
    private subres: SubredditService,
    private router: Router,
    private overLay: OverlayService,
    private postSer: PostService,
    private snak: MatSnackBar,
    private activeRoute: ActivatedRoute
  ) {
    activeRoute.queryParams.subscribe((e) => {
      const id = e['id'];
      if (id) {
        this.editMode = true;
        this.fetchPost(id);
        this.snackMsg('In edit mode');
      }
    });
    this.createPostForm = new FormGroup({
      postName: this.postName,
      subredditName: this.subredditName,
      description: this.description,
    });

    const snap = this.subres.subReddits.value;
    if (!this.editMode && (snap.data?.content.length ?? 0) < 1) {
      this.fetchNextSubreddits();
    }

    this.subres.subReddits.subscribe((e) => {
      this.subreddits = e;
    });
  }

  fetchPost = (id: string) => {
    this.postSer.fetchPostByPostAndSubRedditId(id, '').subscribe((e) => {
      this.overLay.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this.snackMsg(e.error);
      } else if (!e.isLoading) {
        const data = e.data;
        const sub = e.data?.subreddit?.id;
        if (data && sub) {
          this.editPostId = data.postId.toString();
          this.postName.setValue(data.title);
          this.subredditName.setValue(data.subreddit?.id?.toString() ?? '');
          this.description.setValue(data.description);
        } else {
          this.snackMsg('something went wrong');
        }
      }
    });
  };

  fetchNextSubreddits = () => {
    this.subres.fetchSubreddits();
  };

  ngOnInit(): void { }
  snackMsg(msg: string): void {
    this.snak.open(msg, undefined, {
      duration: 2 * 1000,
    });
  }
  createPostForm: FormGroup;
  createPost() {
    if (this.createPostForm.valid) {
      const title = this.postName.value?.trim() ?? '';
      const url = title;
      const postReq: PostReq = {
        description: this.description.value?.trim() ?? '',
        postId: this.editMode ? +this.editPostId : 0,
        postName: title,
        url: url,
      };
      const id = this.editMode
        ? this.editPostId
        : this.subredditName.value ?? '';
      this.postSer.createPost(id, postReq, this.editMode).subscribe((e) => {
        this.overLay.setIsLoading(e.isLoading);
        if (e.error.length > 0) {
          this.snackMsg(e.error);
        } else if (!e.isLoading) {
          const data = e.data?.postId;
          const sub = e.data?.subreddit?.id;
          if (data && sub) {
            this.snackMsg('Post ' + this.editMode ? 'Updated' : 'Created');
            this.router.navigate(['/subreddit', sub, 'post', data]);
          } else {
            this.snackMsg('something went wrong');
          }
        }
      });
    } else {
      this.snak.open('Please fill the form', undefined, {
        duration: 2 * 1000,
      });
    }
  }
}
