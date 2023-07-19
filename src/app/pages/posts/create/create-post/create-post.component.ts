import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor() { 
    this.createPostForm = new FormGroup({
      postName : new FormControl(''),
      subredditName : new FormControl(''),
      description : new FormControl(''),
    });
  }

  subreddits = [
    {
      name:'akash'
    }
  ]

  ngOnInit(): void {
  }

  createPostForm:FormGroup;
  createPost(){
    
  }
}
type a = {
  name:string
}
