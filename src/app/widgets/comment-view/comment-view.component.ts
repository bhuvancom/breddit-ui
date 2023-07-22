import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss'],
})
export class CommentViewComponent implements OnInit {
  @Input() comment!: Comment;
  delete = false;
  @Input() onDelete?: (comId: string) => void;
  constructor(
    private authSer: AuthService,
    private _snak: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  deleteComment = () => {
    const isLoggedIn = this.authSer.isLoggedIn.value;
    if (!isLoggedIn) {
      this._snak.open('You are not logged in', undefined, {
        duration: 2 * 1000,
      });
      return;
    }
    if (this.onDelete) {
      const dialogRef = this.dialog.open(DialogContentExample, {
        data: {
          delete: this.delete,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result)
          this.onDelete?.(this.comment.commentId + '');
      });
    }
  };
}

@Component({
  selector: 'dialog-delete',
  templateUrl: './dialog-delete.html',
})
export class DialogContentExample {
  constructor(
    public dialogRef: MatDialogRef<CommentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean
  ) { };



  onNoClick(): void {
    this.dialogRef.close();
  }
}
