import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable, Subject } from 'rxjs';
import { Message } from 'src/model/classes/Message';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private subject = new Subject();

  constructor(private userService: UserService, private http: HttpClient) {

  }

  updateMessages(user:number, user2:number, id:number, page:number): Observable<any> {
    const headers = {authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json'};
    const url = `${environment.apiUrl}/messages/parentmessage/${id}?userId=${user}&user2Id=${user2}&page=${page}`;
    return this.http.get(url, {headers});
  }

  getMessages(user: number, user2: number): Observable<any> {
    const headers = {authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json'};
    const url = `${environment.apiUrl}/messages/get-messages/${user}/${user2}`;
    return this.http.get(url, {headers});
  }

  sendMessage(sender: number, receiver: number, message: string, parent: number | null): Observable<any> {
    const headers = {authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json'};
    const url = `${environment.apiUrl}/messages/insert-message`;
    const body = {senderId: sender, receiverId: receiver, message: message, parentId: parent};
    return this.http.post(url, body, {headers});
  }


  onInsert(message: Message): void{
    this.subject.next(message);
  }


  setAsSeen(user1: number, user2: number): Observable<any> {
    const headers = {authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json'};
    const url = `${environment.apiUrl}/messages/was-seen/${user1}/${user2}`;
    return this.http.put(url, null, {headers});
  }
  
  getNumberOfUnreadMessages(sender_id: number, receiver_id: number): Observable<any> {
    const headers = {authorization: `Bearer ${this.userService.currentUser.token}`, 'Content-Type': 'application/json'};
    const url = `${environment.apiUrl}/messages/get-unread/`;
    const body = {sender_id: sender_id, receiver_id: receiver_id};
    return this.http.post(url, body, {headers});
  }

  onInsertObservable(): Observable<any>{
    return this.subject.asObservable();
  }
  /*
  onLoad():Observable<any>{
    return this.subject.asObservable();
  }

  onChange(): Observable<any> {
    return this.subject.asObservable()
  } */
}
