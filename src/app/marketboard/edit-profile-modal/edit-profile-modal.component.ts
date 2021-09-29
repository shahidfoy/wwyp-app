import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { SettingsService } from 'src/app/service/settings.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss'],
})
export class EditProfileModalComponent implements OnInit, OnDestroy {

  @Input() user: User;
  usernameInput: string;
  firstNameInput: string;
  lastNameInput: string;
  emailInput: string;

  isDarkMode: boolean;
  subscriptions: Subscription[] = [];

  constructor(public modalController: ModalController,
              private authenticationService: AuthenticationService,
              private settingsService: SettingsService,
              private userService: UserService) { }

  ngOnInit() {
    this.usernameInput = this.user.username;
    this.firstNameInput = this.user.firstName;
    this.lastNameInput = this.user.lastName;
    this.emailInput = this.user.email;

    this.subscriptions.push(
      this.settingsService.darkMode.subscribe((isDarkMode: boolean) => {
        this.isDarkMode = isDarkMode;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
  
  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true,
    });
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public toggleDarkTheme(): void {
    this.user.darkModeEnabled = !this.user.darkModeEnabled;;
    const formData: FormData = this.userService.editUserFormData(this.user.email, this.user);

    this.subscriptions.push(
      this.userService.editUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.user = response;
          // TODO:: NOTIFY USER OF SUCCESS
        },
        (errorResponse: HttpErrorResponse) => {
          // TODO:: NOTIFIY USER OF ERROR
          console.log(errorResponse);
        }
      )
    );
    this.settingsService.toggleDarkTheme();
  }

  public editUserProfile(updatedUser: User) {
    const formData: FormData = this.userService.editUserFormData(this.user.email, updatedUser);

    this.subscriptions.push(
      this.userService.editUser(formData).subscribe(
        (response: User) => {
          this.authenticationService.addUserToLocalCache(response);
          this.user = response;
          window.location.reload();
          // TODO:: NOTIFY USER OF SUCCESS
        },
        (errorResponse: HttpErrorResponse) => {
          // TODO:: NOTIFIY USER OF ERROR
          console.log(errorResponse);
        }
      )
    );
  }
}
