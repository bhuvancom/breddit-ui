import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  public isLoadin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public setIsLoading(isLoad: boolean) {
    console.log("setting to ", { isLoad });

    this.isLoadin.next(isLoad);
  }
  constructor() { }
}
