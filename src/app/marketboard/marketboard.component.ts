import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-marketboard',
  templateUrl: './marketboard.component.html',
  styleUrls: ['./marketboard.component.scss'],
})
export class MarketboardComponent implements OnInit, OnDestroy {

  user: User;
  totalUnreadNotifications: number = 0;
  subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {}


  ngOnInit() {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getTotalNotificationCount();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


  private getTotalNotificationCount() {
    this.subscriptions.push(
      this.notificationService.countUnreadNotificationByUserId(this.user.id).subscribe((total: number) => {
        this.totalUnreadNotifications = total;
      }));
  }
}
