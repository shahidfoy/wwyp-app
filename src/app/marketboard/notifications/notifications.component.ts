import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { Notification } from 'src/app/model/notification';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { timeFromNow } from 'src/app/shared/shared.utils';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {

  user: User;
  usersMap: Map<number, User> = new Map();
  notifications: Notification[] = [];
  subscriptions: Subscription[] = [];

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userService: UserService) {}

  ngOnInit() {
    this.user = this.authenticationService.getUserFromLocalCache();
    this.getNotifications();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }


  public getUserProfileImage(userId: number) {
    return this.usersMap.get(userId) ? this.usersMap.get(userId).profileImageUrl : undefined;
  }

  public markRead(notificationId: number) {
    this.subscriptions.push(
      this.notificationService.markNotificationsAsRead([notificationId]).subscribe(() => {
        this.getNotifications();
        window.location.reload();
      }));
  }

  public timeFromNow(time: Date) {
    return timeFromNow(time);
  }

  private getNotifications() {
    this.subscriptions.push(
      this.notificationService.findNotificationByUserId(this.user.id, 0).subscribe((notifications: Notification[]) => {
        this.notifications = notifications;
        this.getNotificationsRespondingUser();
      }));
  }

  private getNotificationsRespondingUser() {
    this.notifications.forEach((notification: Notification) => {
      this.subscriptions.push(
        this.userService.findUserById(notification.offer.userId).subscribe((user: User) => {
          this.usersMap.set(notification.offer.userId, user);
        }));
    });
  }
}
