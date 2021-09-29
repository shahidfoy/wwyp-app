import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  user: User;
  isDarkMode: boolean = false;
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private authenticationService: AuthenticationService) {
    if (this.authenticationService.getUserFromLocalCache()) {
      this.user = this.authenticationService.getUserFromLocalCache();
      this.isDarkMode = this.user.darkModeEnabled;
      this.isDarkMode ? this.darkModeOn() : this.darkModeOff();
    } else {
      this.darkModeOff();
    }
  }

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
