import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {
  @Input() username: string = "";
  @Input() onSubmit?: (cmmng: string, onSuccess: () => void) => void;
  commentForm = new FormControl('');
  constructor() {

  }
  onSubmitometn = () => {
    const cmnt = this.commentForm.value?.trim() ?? "";
    this.onSubmit?.(cmnt, () => {
      this.commentForm.setValue('');
    });
  }
  ngOnInit(): void {
  }

}
