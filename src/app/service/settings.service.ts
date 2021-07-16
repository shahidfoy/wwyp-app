import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // TODO:: GET DARK MODE PREFERENCE FROM USER INFO
  isDarkMode = false;
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(this.isDarkMode);

  constructor() { }

  public toggleDarkTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.isDarkMode ? this.darkModeOn() : this.darkModeOff();
  }

  public darkModeOn(): void {
    this.isDarkMode = true;
    document.body.classList.toggle('dark', true);
    this.darkMode.next(true);
  }

  public darkModeOff(): void {
    this.isDarkMode = false;
    document.body.classList.toggle('dark', false);
    this.darkMode.next(false);
  }
}
