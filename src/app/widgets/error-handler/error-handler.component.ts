import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss'],
})
export class ErrorHandlerComponent implements OnInit {
  @Input('inputString') inputString: string = '';
  @Input('callback') callback!: Function;

  constructor() {}
  callFunction(): void {
    console.log("Calling error handler function");
    this.callback();
  }
  ngOnInit(): void {}
}
