import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme: BehaviorSubject<string> = new BehaviorSubject('light');
  constructor() {
    const theme = localStorage.getItem(this.ethemeKey);
    console.log('Setting theme ', theme);
    if (theme)
      this.currentTheme.next(theme);
  }
  toggleTheme() {
    const theme = this.currentTheme.getValue() === 'light' ? 'dark' : 'light'
    this.currentTheme.next(theme);
    this.setTheme()
    console.log('Setting theme ', theme);
  }
  private ethemeKey = "theme";
  private setTheme() {
    localStorage.setItem(this.ethemeKey, this.currentTheme.getValue());
  }
}
