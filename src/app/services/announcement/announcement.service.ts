import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {


  constructor(private userService: UserService, private http: HttpClient) { }

  getAnnouncements(): Observable<any[]> {
    const url = `${environment.apiUrl}/announcement/get-all-announcements-for-user/${this.userService.currentUser.id}`;
    const headers = {'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userService.currentUser.token};
    return this.http.get<any[]>(url, { headers: headers });
  }

  get10FirstAnnouncements(): Observable<any[]> {
    const url = `${environment.apiUrl}/announcement/get-first-ten-announcements-for-user/${this.userService.currentUser.id}`;
    const headers = {'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userService.currentUser.token};
    return this.http.get<any[]>(url, { headers: headers });
  }

  get10MoreAnnouncements(announcementId: number):Observable<any[]> {
    const url = `${environment.apiUrl}/announcement/get-next-ten-announcements-for-user/${this.userService.currentUser.id}/`;
    const headers = {'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userService.currentUser.token};
    const body = {announcementId: announcementId};    
    return this.http.post<any[]>(url, body, { headers: headers });
  }

  createAnnouncement(text: string, title: string):Observable<any>{
    const url = `${environment.apiUrl}/announcement/create`;
    const headers = {'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userService.currentUser.token};
    const body = { body: text, title, senderId: this.userService.currentUser.id };
    return this.http.post(url, body, { headers: headers });
  }

  deleteAnnouncement(announcementId: number):Observable<any>{
    const url = `${environment.apiUrl}/announcement/delete/${announcementId}`;
    const headers = {'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.userService.currentUser.token};
    return this.http.delete(url, { headers: headers });
  }

 
}
