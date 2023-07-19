import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-create-post',
  templateUrl: './home-create-post.component.html',
  styleUrls: ['./home-create-post.component.scss']
})
export class HomeCreatePostComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  gotoCreatePost(){
    this._router.navigate(['create','post']);
  }


}
