import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home-create-post',
  templateUrl: './home-create-post.component.html',
  styleUrls: ['./home-create-post.component.scss']
})
export class HomeCreatePostComponent implements OnInit {

  constructor(private _router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  gotoCreatePost() {
    this._router.navigate(['create', 'post']);
  }

  openProfile() {
    if (this.auth.isLoggedIn.value && this.auth.user?.value) {
      this._router.navigate(['/user', this.auth.user.value.username]);
    }
  }


}
