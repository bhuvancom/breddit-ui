import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private overLay: OverlayService) {
    this.overLay.isLoadin.subscribe(e => {
      this.isLoading = e;
    })
  }

  ngOnInit(): void {
  }

}
