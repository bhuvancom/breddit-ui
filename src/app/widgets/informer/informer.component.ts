import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informer',
  templateUrl: './informer.component.html',
  styleUrls: ['./informer.component.scss']
})
export class InformerComponent implements OnInit {
  @Input() inputString!:string;
  constructor() { }

  ngOnInit(): void {
  }

}
