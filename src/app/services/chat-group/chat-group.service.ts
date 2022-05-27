import { Injectable } from '@angular/core';
import { ChatMessage} from 'src/model/classes/ChatMessage';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { DepartmentService } from '../department/department.service';
import { UserService } from '../user/user.service';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {


  constructor(private http: HttpClient, private userService: UserService) { 
  }

  getLastMessage(): Observable<any>{
    const url = `${environment.apiUrl}/group/last_message/${this.userService.currentUser.id}`;
    const headers = {'authorization': `Bearer ${this.userService.currentUser.token}`};
    return this.http.get(url, {headers});
  }

  getFirstMessages(department_id: number):Observable<any>{
    const url = `${environment.apiUrl}/group/first_ten_messages/${department_id}`;
    const headers = {'authorization': `Bearer ${this.userService.currentUser.token}`};
    return this.http.get(url, {headers});
  }

  sendGroupMessage(department_id: number, sender: number, message: string):Observable<any>{
    const url = `${environment.apiUrl}/group/send_message`;
    const headers = {'authorization': `Bearer ${this.userService.currentUser.token}`};
    const body = {message, departmentId: department_id, senderId: sender};
    return this.http.post(url, body, {headers});
  }

}
