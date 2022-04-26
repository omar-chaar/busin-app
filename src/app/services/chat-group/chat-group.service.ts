import { Injectable } from '@angular/core';
import { ChatMessage} from 'src/model/classes/ChatMessage';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { departmentService } from '../department/department.service';
import { UserService } from '../user/user.service';
import { ChatMessageService } from '../chat-message/chat-message.service';
import { department } from 'src/model/classes/department';
import { User } from 'src/model/classes/User';

@Injectable({
  providedIn: 'root'
})
export class ChatGroupService {

  fakeDb: ChatGroup[] = [];

  constructor(private departmentService: departmentService, private userService: UserService) { 
    const department = this.departmentService.getAlldepartments()

    department.forEach(department => {
      const chatGroup = new ChatGroup(department.id, department, this.userService.getUsersBydepartment(department),
      false);
      this.fakeDb.push(chatGroup);
    })
  }

  getChatById(id: number):ChatGroup{
    return this.fakeDb.filter(chat => chat.id === id)[0];
  }

  async createGroup(department: department):Promise<boolean>{
    const newGroup = new ChatGroup(department.id, department, [], false);
    this.fakeDb.push(newGroup);
    return true
  }

  async deleteGroup(department: department):Promise<boolean>{
    this.fakeDb.splice(department.id, 1);
    return true;
  }

  async removeParticipant(id: number, user: User): Promise<boolean>{
    this.fakeDb.forEach(chat => {
      if(chat.id === id){
        const index = chat.participants.indexOf(user)
        chat.participants.splice(index, 1);
      }
    })
    return true
  }

  async addParticipant(id: number, user: User):Promise<boolean>{
    this.fakeDb.forEach(chat => {
      if(chat.id === id){
        chat.participants.push(user);
      }
    })

    return true
  }

}
