import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.host}/notification/add`, notification);
  }

  public countNotificationByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.host}/notification/count/user/${userId}`);
  }

  public countUnreadNotificationByUserId(userId: number): Observable<number> {
    return this.http.get<number>(`${this.host}/notification/count/user/${userId}/unread`);
  }

  public deleteNotification(id: number): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/notification/delete/${id}`);
  }

  public findNotificationByUserId(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.host}/notification/find/user/${userId}`);
  }

  public markNotificationsAsRead(notificationIds: number[]): Observable<CustomHttpResponse> {
    return this.http.post<CustomHttpResponse>(`${this.host}/notifications/mark/read`, notificationIds);
  }
}
