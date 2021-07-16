import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
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

  public onRegister(user: User): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (response: HttpResponse<User>) => {
          console.log('RESPONSE HEADERS', response.headers.getAll);
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          console.log('TOKEN', token);
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/marketboard/profile');
          this.isLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          // TODO:: NOTIFIY USER OF ERROR
          console.log('Error: ', errorResponse);
          this.isLoading = false;
        }
      )
    )
  }
}
