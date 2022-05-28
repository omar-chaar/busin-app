import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatGroupService } from 'src/app/services/chat-group/chat-group.service';
import { ChatMessageService } from 'src/app/services/chat-message/chat-message.service';
import { DepartmentService } from 'src/app/services/department/department.service';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChatGroup } from 'src/model/classes/ChatGroup';
import { ChatMessage } from 'src/model/classes/ChatMessage';
import { Department } from 'src/model/classes/Department';
import { User } from 'src/model/classes/User';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-group',
  templateUrl: './chat-group.page.html',
  styleUrls: ['./chat-group.page.scss'],
})
export class ChatGroupPage implements OnInit, OnDestroy {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  department: Department = new Department(-1, '', -1);
  messages: ChatMessage[] = [];
  user: User;
  text: string;
  //TODO: INFINITE SCROLL
  constructor(private _router: Router, private route: ActivatedRoute,
   private userService: UserService, private departmentService: DepartmentService,
   private chatGroupService: ChatGroupService, private socketIoService: SocketioService) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.user = this.userService.currentUser;
    this.departmentService.getDepartment(id).subscribe((department) => {
      this.department = new Department(department.data.department_id, department.data.name, department.data.company_id);
      this.chatGroupService.getFirstMessages(this.department.department_id).subscribe(data => {
        const messages = data.data
        console.log(messages)
        this.messages = messages.map(message => {
          const time = this.formatDate(message.time);
          return new ChatMessage(message.group_message_id, message.sender_id, message.department_id, time, message.message_body, message.name,
            message.deptname);
        })
        setTimeout(() => {
          this.ScrollToBottom();
        });          
        this.orderByDate(this.messages);
        this.socketIoService.connect();
        this.groupConnection();
        this.socketIoService.getNewMessageGroupMessage().subscribe((message: ChatMessage) => {
          if (message != null){
          var messageToPush = new ChatMessage(message.id, message.sender, message.department_id, message.time, message.body, message.sender_name, message.department_name);
          console.log(messageToPush);
            if(this.messages.some(message => message.id == messageToPush.id)){
              return;
            }
            this.messages.push(messageToPush);
            setTimeout(() => {
                this.ScrollToBottomWithAnim();
            });    
          }
        });     
      });
    });
  }


  ngOnDestroy(): void {
     this.socketIoService.groupDisconnection(this.department.department_id);
     this.socketIoService.disconnect();
  }

  goBack(): void {
    this._router.navigateByUrl('/tabs/contacts')
  }

  orderByDate(messages: ChatMessage[]): ChatMessage[] {
    return messages.sort((a, b) => {
      return +a.time - +b.time;
    });
  }

  //convert this 2022-05-28T04:46:02.000Z to javascript date
  formatDate(date: string): Date {
    const dateArray = date.split('T');
    const dateString = dateArray[0];
    const timeString = dateArray[1];
    const timeArray = timeString.split('.');
    const time = timeArray[0];
    const dateArray2 = dateString.split('-');
    const year = parseInt(dateArray2[0]);
    const month = parseInt(dateArray2[1]);
    const day = parseInt(dateArray2[2]);
    const dateArray3 = time.split(':');
    const hour = parseInt(dateArray3[0]);
    const minute = parseInt(dateArray3[1]);
    const second = parseInt(dateArray3[2]);
    return new Date(year, month, day, hour, minute, second);
  }

  formatTime(date: Date): string {
    const hour: string =
      date.getHours().toString().length === 1
        ? `0${date.getHours().toString()}`
        : date.getHours().toString();
    const minutes: string =
      date.getMinutes().toString().length === 1
        ? `0${date.getMinutes().toString()}`
        : date.getMinutes().toString();
    return `${hour}:${minutes}`;
  }

  onSubmit(): void {

    if(this.text !== ' '){
      this.chatGroupService.sendGroupMessage(this.department.department_id, this.user.id, this.text)
      .subscribe((data) =>{
        let messageToSend = new ChatMessage(data.response, this.user.id, this.department.department_id, new Date(), this.text, this.user.name, this.department.name)
        this.messages.push(messageToSend);
        setTimeout(() => {
        this.ScrollToBottomWithAnim();
        });
        this.sendGroupMessage(messageToSend);
        this.text = '';
      });
    }
  }

  getDepartmentName(message: ChatMessage): string {
    if(message.department_id !== this.department.department_id){
      return '- ' + message.department_name;
    }else{
      return '';
    }
  }

  groupConnection(){
    this.socketIoService.groupConnection(this.department.department_id);
  }

  sendGroupMessage(message: ChatMessage): void{
    this.socketIoService.groupMessage(message);
  }

  ScrollToBottom() {
    this.content.scrollToBottom(0);
  }

  ScrollToBottomWithAnim() {
    this.content.scrollToBottom(500);
  }

}
