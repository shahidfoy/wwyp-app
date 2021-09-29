import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SettingsService } from './service/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
              private settingsService: SettingsService) {
    this.initializeApp();
  }

  initializeApp() {

    // Query for the toggle that is used to change between themes
    // const toggle: any = document.querySelector('#themeToggle');

    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // prefersDark.matches ? this.settingsService.darkModeOn() : this.settingsService.darkModeOff();
    
    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((e) => checkToggle(e.matches));

    // // Called when the app loads
    // function loadApp() {
    //   checkToggle(prefersDark.matches);
    // }

    // // Called by the media query to check/uncheck the toggle
    // function checkToggle(shouldCheck) {
    //   toggle.checked = shouldCheck;
    // }
  }
}
