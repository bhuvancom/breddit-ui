import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import SubredditRequest from 'src/app/models/request/subreddit-req';
import { OverlayService } from 'src/app/services/overlay.service';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  editMode = false;
  editSubId = 0;
  constructor(
    private subreSer: SubredditService,
    private overLaySer: OverlayService,
    private _snak: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    activeRoute.queryParams.subscribe((e) => {
      const id = e['id'];
      if (id) {
        this.editMode = true;
        this._snak.open('Edit mode please wait ', undefined, {
          duration: 2 * 1000,
        });

        this.fetchSubreddit(id);
      }
    });
  }
  snackMsg(msg: string) {
    this._snak.open(msg, undefined, {
      duration: 2 * 1000,
    });
  }
  fetchSubreddit(id: string) {
    this.subreSer.fetSubRedDetailsOfId(id).subscribe((e) => {
      this.overLaySer.setIsLoading(e.isLoading);
      if (e.error.length > 0) {
        this.snackMsg(e.error);
      } else if (!e.isLoading) {
        const data = e.data;
        if (data) {
          this.editSubId = data.id;
          this.name.setValue(data.name);
          this.description.setValue(data.description);
        } else {
          this.snackMsg('something went wrong');
        }
      }
    });
  }

  onSubmit = () => {
    if (!(this.name.valid || this.description.valid)) return;

    const subredditReq: SubredditRequest = {
      description: this.description.value?.trim() ?? '',
      name: this.name.value?.trim() ?? '',
      id: this.editSubId,
    };

    this.subreSer
      .createSubreddit(subredditReq, this.editMode, this.editSubId)
      .subscribe((e) => {
        this.overLaySer.setIsLoading(e.isLoading);
        if (e.error.length > 0) {
          this._snak.open(
            this.editMode ? 'Editing' : 'Creation' + ' failed ' + e.error,
            undefined,
            {
              duration: 2 * 1000,
            }
          );
        } else if (!e.isLoading) {
          this._snak.open(this.editMode ? 'Updated' : 'Created', undefined, {
            duration: 2 * 1000,
          });
          const id = e.data?.id;
          this.router.navigate(['/subreddit', id]);
        }
      });
  };

  ngOnInit(): void { }
}
