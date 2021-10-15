import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(public toastController: ToastController,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/marketboard/profile');
    } else {
      this.router.navigateByUrl('/register');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // TODO:: IMPLEMENT FORM VALIDATION

  public onRegister(form: NgForm): void {
    const user: User = form.value;
    this.isLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: HttpResponse<User>) => {
          // console.log('RESPONSE HEADERS', response.headers.getAll);
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/marketboard/profile');
          this.isLoading = false;
          form.resetForm();
        },
        (errorResponse: HttpErrorResponse) => {
          console.log('Error: ', errorResponse);
          this.presentToast('Error registering in please try again later');
          this.isLoading = false;
        }
      )
    )
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      position: 'bottom',
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
