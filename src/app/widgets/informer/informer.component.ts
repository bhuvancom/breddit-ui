import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-informer',
  templateUrl: './informer.component.html',
  styleUrls: ['./informer.component.scss']
})
export class InformerComponent implements OnInit {
  @Input() inputString!:string;
  @Input() alertType:string = "info";
  @Input() closable:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
