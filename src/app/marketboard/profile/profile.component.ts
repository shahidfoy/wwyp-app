import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/model/contract';
import { User } from 'src/app/model/user';
import { ContractService } from 'src/app/service/contract.service';
import { SettingsService } from 'src/app/service/settings.service';
import { UserService } from 'src/app/service/user.service';
import { timeFromNow } from 'src/app/shared/shared.utils';
import { AuthenticationService } from '../../service/authentication.service';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { NewContractModalComponent } from '../new-contract-modal/new-contract-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User;
  subscriptions: Subscription[] = [];
  isDarkMode: boolean = false;
  selected: string = 'contracts';
  contracts: Contract[];

  constructor(
    public modalController: ModalController,
    private settingsService: SettingsService,
    private authenticationService: AuthenticationService,
    private contractService: ContractService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(() => {
        this.user = this.authenticationService.getUserFromLocalCache();
        this.isDarkMode = this.user.darkModeEnabled;
        this.isDarkMode ? this.settingsService.darkModeOn() : this.settingsService.darkModeOff();
        this.getContracts(this.user.id);
      }));
    
    this.subscriptions.push(
      this.settingsService.darkMode.subscribe((isDarkMode: boolean) => {
        this.isDarkMode = isDarkMode;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public async createNewContract(): Promise<void> {
    const modal = await this.modalController.create({
      component: NewContractModalComponent,
      componentProps: {
        'user': this.user
      }
    });
    return await modal.present();
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

  public getContracts(id: number) {
    this.subscriptions.push(
      this.contractService.findContractByContracteeId(id).subscribe((contracts: Contract[]) => {
        this.contracts = contracts;
      }));
  }

  public logOut(): void {
    this.authenticationService.logOut();
    this.settingsService.darkModeOff();
    this.router.navigateByUrl('/login');
  }

  public segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.selected = ev.detail.value;
  }

  public timeFromNow(time: Date) {
    return timeFromNow(time);
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
}
