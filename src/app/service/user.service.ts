import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public deleteUser(username: string): Observable<CustomHttpResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
  }

  public editUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/edit`, formData);
  }

  public findUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.host}/user/find/id/${id}`);
  }

  public findUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.host}/user/find/username/${username}`);
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public getProfileImageByUserId(id: number): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${this.host}/user/profile-image/id/${id}`, { headers, responseType: 'text' });
  }
  
  public getProfileImageByUsername(username: string): Observable<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(`${this.host}/user/profile-image/username/${username}`, { headers, responseType: 'text' });
  }

  public resetPassword(email: string): Observable<CustomHttpResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/update-profile-image`, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public editUserFormData(loggedInUserEmail: string, user: User): FormData {
    const formData: FormData = new FormData();
    formData.append('currentUsername', loggedInUserEmail);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('isDarkModeEnabled', JSON.stringify(user.darkModeEnabled));
    return formData;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData: FormData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}
