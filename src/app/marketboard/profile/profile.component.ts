import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { SettingsService } from 'src/app/service/settings.service';
import { AuthenticationService } from '../../service/authentication.service';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscriptions: Subscription[] = [];
  isDarkMode: boolean;

  constructor(public modalController: ModalController,
              private settingsService: SettingsService,
              private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.subscriptions.push(
      this.settingsService.darkMode.subscribe((isDarkMode: boolean) => {
        this.isDarkMode = isDarkMode;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public async editProfile(): Promise<void> {
    const modal = await this.modalController.create({
      component: EditProfileModalComponent,
      componentProps: {
        'user': this.user
      }
    });
    return await modal.present();
  }

  public logOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }

  public toggleDarkTheme(): void {
    this.settingsService.toggleDarkTheme();
  }
}
